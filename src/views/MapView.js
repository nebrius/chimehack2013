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
			y: 229,
			//scrollX: false,
			useLayoutBounds: true,
            //scrollBounds: {
            //	minX: 0,
            //	minY: 0
            //},
			//bounceRadius: 30,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT - 350,
		});

		supr(this, 'init', [opts]);

		this.buildView();

		this.scrollTo(200,200,550);
	};

	this.load = function() {

	}

	this.buildView = function() {

		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: 1500,
			height: 1301,
			image: "resources/images/backgrounds/map_bg.png",
			opacity: 1
		});

		this.HomeButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 76,
		    x: 420,
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
		    x: 230,
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

    	this.DonationsButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 80,
		    x: 340,
		    y: 250,
		    images: {
		      up: "resources/images/buttons/donation.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    },
		    on: {
		      up: bind(this, function () {
		      		this.emit('Donate');
				})		      
		    }
    	});

    	this.LeaderboardButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 80,
		    x: 250,
		    y: 400,
		    images: {
		      up: "resources/images/buttons/leaderboard.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    },
		    on: {
		      up: bind(this, function () {
		      		this.emit('LoadLeaderboard');
				})		      
		    }
    	});
	};
});
