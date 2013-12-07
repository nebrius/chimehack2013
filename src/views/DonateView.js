import ui.View as View;
import ui.ImageView as ImageView;
import src.constants.gameConstants as gameConstants;
import ui.TextView as TextView;
import ui.widget.ButtonView as ButtonView;
import src.lib.parseUtil as ParseUtil;
import ui.TextEditView as TextEditView;

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
			height: 960,
			image: "resources/images/backgrounds/donation_bg.png",
			opacity: 1
		});

		/*this.TitleText = new TextView({
			parent: this,
			x: gameConstants.GAME_WIDTH / 2 - 180,
			y: 100,
			width: 350,
			height: 150,
			text: "Donate",
			fontFamily: gameConstants.MAIN_FONT,
			color: 'white',
			size: 50,
			canHandleEvents: false
		});*/

    	this.BackButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 80,
		    x: 400,
		    y: 10,
		    images: {
		      up: "resources/images/buttons/close_button.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    },
		    on: {
		      up: bind(this, function () {
		      		this.emit('Back');
				})		      
		    }
    	});

		this.customAmountEditView = new TextEditView({
			superview: this,
			x: 160,
			y: 380,
			//backgroundColor: "#ffffff",
			width: 456,
			height: 80,
			fontWeight: "bold",
			//horizontalAlign: "center",
			color: "#ffffff",
			hintColor: "#ffffff",
			hint: "Enter Custom Amount"
		});

		this.emailEditView = new TextEditView({
			superview: this,
			x: 160,
			y: 500,
			//backgroundColor: "#ffffff",
			width: 456,
			height: 80,
			fontWeight: "bold",
			//horizontalAlign: "center",
			color: "#ef7c21",
			hintColor: "#ef7c21",
			hint: "Enter Email"
		});

    	this.donateButton = new ButtonView({
			superview: this,
			width: 190,
			height: 125,
			x: gameConstants.GAME_WIDTH / 2 - 100,
			y: 670,
			images: {
				up: "resources/images/buttons/login_button.png"
				//down: "resources/images/buttons/brown_button_down.png"
			},
			on: {
				up: bind(this, function () {
					this.emit('Back');
				})
			}
		});
	};
});
