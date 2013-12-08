import ui.View as View;
import ui.ImageView as ImageView;
import src.constants.gameConstants as gameConstants;
import ui.TextView as TextView;
import ui.widget.ButtonView as ButtonView;

exports = Class(View, function (supr) {

	this.init = function(opts) {

		opts = merge(opts, {
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			backgroundColor: '#ef6e07'
		});

		supr(this, 'init', [opts]);

		this.buildView();
	};

	this.buildView = function() {

		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			image: "resources/images/backgrounds/intro_2.jpg",
			opacity: 1
		});

    	this.loginButton = new ButtonView({
		    superview: this,
		    width: 190,
		    height: 125,
		    x: gameConstants.GAME_WIDTH / 2 - 100,
		    y: 710,
		    //images: {
		      //up: "resources/images/buttons/login_button.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    //},
		    on: {
		      up: bind(this, function () {
				    this.emit('Continue');
				})		      
		    },
		    title: "",
		    text: {
		      color: "#ffffff",
		      size: 36,
		      autoFontSize: false,
		      autoSize: false
		    }
    	});

	};
});
