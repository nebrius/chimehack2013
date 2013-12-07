import ui.View as View;
import ui.ImageView as ImageView;
import src.constants.gameConstants as gameConstants;
import ui.TextView as TextView;
import ui.widget.ButtonView as ButtonView;
import src.lib.parseUtil as ParseUtil;
import device;
import ui.ScrollView as ScrollView;

exports = Class(ScrollView, function (supr) {

	this.init = function(opts) {

		//var scale = opts.scale || 1;

		opts = merge(opts, {
			x: 0,
			y: 250,
			scrollX: false,
			useLayoutBounds: true,
            scrollBounds: {
            	minX: 0,
            	minY: 0
            },
			bounceRadius: 150,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT - 400,
			backgroundColor: '#ffffff'
		});

		supr(this, 'init', [opts]);

		this.buildView();
	};

	this.load = function() {

	}

	this.buildView = function() {

		/*this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			image: "resources/images/backgrounds/map_bg.jpg",
			opacity: 1
		});*/

		this.HomeButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 76,
		    x: 20,
		    y: 100,
		    images: {
		      up: "resources/images/buttons/home.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    },
		    on: {
		      up: bind(this, function () {
		      		this.emit('Donate');
				})		      
		    }
    	});

    	this.ProfileButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 80,
		    x: 130,
		    y: 200,
		    images: {
		      up: "resources/images/buttons/profile.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    },
		    on: {
		      up: bind(this, function () {
		      		this.emit('Donate');
				})		      
		    }
    	});
	};
});
