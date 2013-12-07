import event.Emitter as Emitter;
import src.lib.parse as Parse;

exports = Class(Emitter, function (supr) {
	
	this.init = function (opts) {
		
		supr(this, 'init', [opts]);
	};

this.signUp = function(username, password) {

	var user = new Parse.Parse.User();
	user.set("username", username);
	user.set("password", password);
	//user.set("email", username);
	 
	user.signUp(this, {
	  success: function(user) {
	    
	  },
	  error: function(user, error) {
	    alert("Error: " + error.code + " " + error.message);

	    //this.login(user.attributes.username, 'battlefour');
	  }
	});
};

this.logout = function() {
	Parse.Parse.User.logOut();
}

this.currentUser = function() {
	return Parse.Parse.User.current();
}

this.login = function(username, password) {
	Parse.Parse.User.logIn(username, password, {
	  success: function(user) {
	    // Do stuff after successful login.
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
};

});