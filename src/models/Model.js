/*
The MIT License (MIT)

Copyright (c) 2013 Bryan Hughes, Nicole Jiang, Jaayden Halko , Bonnie Li

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*global Class, Emitter, XMLHttpRequest, merge*/
import event.Emitter as Emitter;

var ENDPOINT_PREFIX = 'http://162.243.132.235/api/';

exports = Class(Emitter, function (supr) {
	this.init = function (id, endpoint, values, defaults) {
		supr(this, 'init', arguments);
		this._modelAttributes = {};
		this._modelValues = {};
		this._id = id;
		this._endpoint = ENDPOINT_PREFIX + endpoint;
		values = merge(values || {}, defaults || {});
		for (var attribute in values) {
			this.set(attribute, values[attribute]);
		}
	};

	/**
	 * Gets the value of an attribute
	 *
	 * get(attribute) -> Any
	 *	- attribute <string>	The name of the attribute to get
	 */
	this.get = function (attribute) {
		return this._modelAttributes[attribute];
	};

	/**
	 * Sets the value of an attribute
	 * 
	 * set(attribute value) -> undefined
	 *	- attribute <string>	The name of the attribute to set
	 *	- value <any>			The value to set the attribute to
	 */
	this.set = function (attribute, value) {
		if (!this._modelAttributes.hasOwnProperty(attribute)) {
			Object.defineProperty(this._modelAttributes, attribute, {
				get: function () {
					return this._modelValues[attribute];
				}.bind(this),
				set: function (value) {
					if (this._modelValues[attribute] !== value) {
						var previous = this._modelValues[attribute];
						this._modelValues[attribute] = value;
						this.emit('change', {
							attribute: attribute,
							value: value,
							previous: previous
						});
					}
				}.bind(this),
				enumerable: true
			});
		}
		this._modelAttributes[attribute] = value;
	};

	/**
	 * Gets the list of attribute names
	 *
	 * attributeNames() -> Array<string>
	 */
	this.attributeNames = function () {
		return Object.keys(this._modelAttributes);
	};

	/**
	 * Gets the model id (key in the database). The id is not present as an attribute
	 *
	 * id() -> number
	 */
	this.id = function () {
		return this._id;
	};

	/**
	 * Fetches the appropriate model from the server and populates the attributes
	 *
	 * fetch(callback) -> undefined
	 *	- callback <Function(error)> The callback to call. Error is a string if an error occured, undefined otherwise
	 */
	this.fetch = function (callback) {
		if (typeof this._id == 'undefined') {
			throw new Error('Attempted to fetch a model without an id');
		}

		var xhr = new XMLHttpRequest(),
			err;
		xhr.onerror = function(e) {
			err = e.target.status;
		};
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status != 200) {
					callback && callback(err || 'HTTP request failed with code ' + xhr.status);
					return;
				}
				var response;
				try {
					response = JSON.parse(xhr.responseText);
				} catch(e) {
					callback && callback(e.toString());
					return;
				}
				for (var attribute in response) {
					this.set(attribute, response[attribute]);
				}
				callback && callback();
			}
		}.bind(this);
		xhr.open('get', this._endpoint + '/' + this._id);
		xhr.send();
	};

	/**
	 * Saves the model to the server. If the model already exists (i.e. a database entry whose key corresponds to this
	 * model's ID), then the database entry is updated, otherwise a new one is created
	 *
	 * save(callback) -> undefined
	 *	- callback <Function(error)> The callback to call. Error is a string if an error occured, undefined otherwise
	 */
	this.save = function (callback) {
		var xhr = new XMLHttpRequest(),
			hasId = typeof this._id != 'undefined',
			err;
		xhr.onerror = function(e) {
			err = e.target.status;
		};
		xhr.onload = function () {
			if (xhr.status != 200) {
				callback && callback(err || 'HTTP request failed with code ' + xhr.status);
				return;
			}
			var response;
			try {
				response = JSON.parse(xhr.responseText);
			} catch(e) {
				callback && callback(e.toString());
				return;
			}
			this._id = response.id;
			for (var attribute in response) {
				if (attribute != 'id') {
					this.set(attribute, response[attribute]);
				}
			}
			callback && callback();
		}.bind(this);
		xhr.open(hasId ? 'put' : 'post', this._endpoint + '/' + (hasId ? this._id : 'create'));
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		var content = JSON.stringify(merge({ id: this._id, }, this._modelValues));
		xhr.send(content);
	};
});
