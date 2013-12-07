import ui.View as View;
import ui.ImageView as ImageView;
import src.constants.gameConstants as gameConstants;
import ui.TextView as TextView;
import ui.widget.ButtonView as ButtonView;
import ui.TextEditView as TextEditView;
import src.lib.parseUtil as ParseUtil;
import device;
import src.views.ErrorView as ErrorView;

exports = Class(View, function (supr) {

	this.init = function(opts) {

		opts = merge(opts, {
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT
		});

		supr(this, 'init', [opts]);

		this.buildView();

		//this.parseUtil = new ParseUtil();
		//this.currentUser = this.parseUtil.currentUser();
	};

	this.checkForLoggedInUser = function() {

		//if (this.currentUser) {
		//    this.emit('Start');
		//} 
	}

	this.buildView = function() {

		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			image: "resources/images/backgrounds/title.png",
			opacity: 1
		});

		this.TitleText = new TextView({
			parent: this,
			x: gameConstants.GAME_WIDTH / 2 - 220,
			y: 50,
			width: 450,
			height: 150,
			text: "Trick or Treat for UNICEF",
			fontFamily: gameConstants.MAIN_FONT,
			size: 140,
			canHandleEvents: false
		});

		this._textEditView = new TextEditView({
	      	superview: this,
		  	x: gameConstants.GAME_WIDTH / 2 - 220,
			y: 200,
	      	backgroundColor: "#404040",
	      	width: 400,
	      	height: 80,
	      	color: "#FFFFFF",
	      	hintColor: "orange",
	      	hint: "Enter access code"
	    });

	    this._textEditView = new TextEditView({
	      	superview: this,
		  	x: gameConstants.GAME_WIDTH / 2 - 220,
			y: 350,
	      	backgroundColor: "#404040",
	      	width: 400,
	      	height: 80,
	      	color: "#FFFFFF",
	      	hintColor: "orange",
	      	hint: "Enter password"
	    });

    	this.loginButton = new ButtonView({
		    superview: this,
		    width: 350,
		    height: 80,
		    x: gameConstants.GAME_WIDTH / 2 - 170,
		    y: 470,
		    images: {
		      up: "resources/images/buttons/brown_button_up.png",
		      down: "resources/images/buttons/brown_button_down.png"
		    },
		    scaleMethod: "9slice",
		    sourceSlices: {
		      horizontal: {left: 80, center: 116, right: 80},
		      vertical: {top: 10, middle: 80, bottom: 10}
		    },
		    destSlices: {
		      horizontal: {left: 40, right: 40},
		      vertical: {top: 4, bottom: 4}
		    },
		    on: {
		      up: bind(this, function () {

		      		//this.parseUtil.signUp(this._textPromptView.getText(),'battlefour');

				    this.emit('Start');
				})		      
		    },
		    title: "Login",
		    text: {
		      color: "#ffffff",
		      size: 36,
		      autoFontSize: false,
		      autoSize: false
		    }
    	});

    	this.errorDialog = new ErrorView({
    		parent: this
		});
		this.addSubview(this.errorDialog);

	};
});
