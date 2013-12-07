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
			y: 0,
			scrollX: false,
			useLayoutBounds: true,
            scrollBounds: {
            	minX: 0,
            	minY: 0
            },
			bounceRadius: 150,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			backgroundColor: '#000000'
		});

		supr(this, 'init', [opts]);

		this.buildView();
	};

	this.load = function() {
		//this.parseUtil = new ParseUtil();
		//this.parseUtil.on('GamesLoaded', bind(this, 'onGamesLoaded'));
		//this.currentUser = this.parseUtil.currentUser();
		
		/*if (this.currentUser) {
		    this.parseUtil.getGames(this.currentUser);
		    this.currentUserText.setText('Current User: ' + this.currentUser.attributes.username);
		} else {
		    // show the signup or login page  
		}*/
	}

	this.buildView = function() {

		/*this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			image: "resources/images/backgrounds/home.png",
			opacity: 1
		});*/
		this.tempText = new TextView({
			parent: this,
			x: gameConstants.GAME_WIDTH / 2 - 220,
			y: 100,
			width: 450,
			height: 150,
			text: "",
			fontFamily: gameConstants.MAIN_FONT,
			size: 28,
			color: 'white',
			canHandleEvents: false
		});

		this.TitleText = new TextView({
			parent: this,
			x: gameConstants.GAME_WIDTH / 2 - 150,
			y: 50,
			width: 350,
			height: 150,
			text: "Home View",
			fontFamily: gameConstants.MAIN_FONT,
			color: 'white',
			size: 50,
			canHandleEvents: false
		});

		this.DonateButton = new ButtonView({
		    superview: this,
		    width: 250,
		    height: 80,
		    x: gameConstants.GAME_WIDTH / 2 - 120,
		    y: 150,
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
		      		this.emit('Donate');
				})		      
		    },
		    title: "Donate",
		    text: {
		      color: "#ffffff",
		      size: 36,
		      autoFontSize: true,
		      autoSize: false
		    }
    	});

    	this.LeaderboardButton = new ButtonView({
		    superview: this,
		    width: 250,
		    height: 80,
		    x: gameConstants.GAME_WIDTH / 2 - 120,
		    y: 250,
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
		      		this.emit('LoadLeaderboard');
				})		      
		    },
		    title: "Leaderboard",
		    text: {
		      color: "#ffffff",
		      size: 36,
		      autoFontSize: true,
		      autoSize: false
		    }
    	});
	};
});
