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

/*global XMLHttpRequest, Class, Emitter, Model*/
import event.Emitter as Emitter;
import ..models.Model as Model;

var ENDPOINT_PREFIX = 'http://localhost:8080/api/',
	SYNC_INTERVAL = 5000;

exports = Class(Emitter, function (supr) {
	this.init = function (endpoint, constructor, models) {
		supr(this, 'init', arguments);
		this._endpoint = ENDPOINT_PREFIX + endpoint;
		this._constructor = constructor;
		if (models instanceof Model) {
			models = [ models ];
		}
		this._models = Array.isArray(models) ? models : [];
	};

	/**
	 * Adds a model to the collection, if it doesn't already exist
	 *
	 * add(model) -> undefined
	 *	-model <..models.Model> The model to add
	 */
	this.add = function (model) {
		if (this._models.indexOf(model) != -1) {
			return;
		}
		this._models.push(model);
		this.emit('added', {
			location: this._models.length - 1,
			model: model
		});
	};

	this.remove = function (model) {
		var location = this._models.indexOf(model);
		if (location == -1) {
			return;
		}
		this._models.splice(location, 1);
		this.emit('removed', {
			location: location,
			model: model
		});
	};

	this.keepInSync = function () {
		setInterval(function () {
			if (!this._saving) {
				this.fetch();
			}
		}.bind(this), SYNC_INTERVAL);
	};

	this.fetch = function (callback) {
		var xhr = new XMLHttpRequest(),
			err;
		xhr.onerror = function(e) {
			err = e.target.status;
		};
		xhr.onreadystatechange = function () {
			function fetchResponse() {
				semaphoreCount--;
				if (!semaphoreCount) {
					callback && callback();
				}
			}
			if (xhr.readyState == 4) {
				if (xhr.status != 200) {
					callback && callback(err || 'HTTP request failed with code ' + xhr.status);
					return;
				}
				var response,
					semaphoreCount = 0;
				try {
					response = JSON.parse(xhr.responseText);
				} catch(e) {
					callback && callback(e.toString());
					return;
				}
				for (var id in response) {
					var found;
					for (var i = 0, len = this._models.length; i < len; i++) {
						if (this._models[i].get('id') == id) {
							semaphoreCount++;
							this._models[i].fetch(fetchResponse);
							found = true;
						}
					}
					if (!found) {
						var newModel = new this._constructor({ id: id });
						this.add(newModel);
						semaphoreCount++;
						newModel.fetch(fetchResponse);
					}
				}
				if (err) {
					semaphoreCount = 0;
				}
				if (!semaphoreCount) {
					callback && callback(err);
				}
			}
		}.bind(this);
		xhr.open('get', this._endpoint, true);
		xhr.send();
	};

	this.save = function (callback) {
		this._saving = true;
		var semaphoreCount = this._models.length;

		function saveResponse(err) {
			semaphoreCount--;
			if (err) {
				semaphoreCount = 0;
			}
			if (!semaphoreCount) {
				this._saving = false;
				callback && callback(err);
			}
		}

		this._models.forEach(function (model) {
			model.save(saveResponse);
		});
	};

	this.filter = function (filter) {
		var results = [];
		this._models.forEach(function (model) {
			var fits = true;
			for (var attribute in filter) {
				if (typeof filter[attribute] == 'function') {
					fits = fits && filter[attribute](model.get(attribute));
				} else if (model.get(attribute) !== filter[attribute]) {
					fits = false;
				}
			}
			if (fits) {
				results.push(model);
			}
		});
		return results;
	};

	this.values = function () {
		return this._models;
	};

	this.modelWithId = function (id) {
		for (var i = 0, len = this._models.length; i < len; i++) {
			if (this._models[i].get('id') == id) {
				return this._models[i];
			}
		}
	};
});
