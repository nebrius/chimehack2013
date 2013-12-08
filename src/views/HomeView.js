import ui.View as View;
import ui.ImageView as ImageView;
import src.constants.gameConstants as gameConstants;
import ui.TextView as TextView;
import ui.widget.ButtonView as ButtonView;
import src.lib.parseUtil as ParseUtil;
import device;
import ui.ScrollView as ScrollView;
import src.views.MapView as MapView;
import src.views.MapItemView as MapItemView;

import src.models.Donation as Donation;

exports = Class(View, function (supr) {

	this.init = function(opts) {

		//var scale = opts.scale || 1;

		opts = merge(opts, {
			x: 0,
			y: 0,
			//scrollX: false,
			//useLayoutBounds: true,
            //scrollBounds: {
            //	minX: 0,
            //	minY: 0
            //},
			//bounceRadius: 150,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			backgroundColor: '#ef6e07'
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

		GLOBAL.gameData.on('loaded', function () {
			this.usernameText.setText(GLOBAL.gameData.student.get('name'));
			GLOBAL.gameData.donationCollection.on('added', function () {
				this.donationAmountText.setText('$' + GLOBAL.gameData.donationCollection.filter({
					student: GLOBAL.gameData.student.get('id')
				}).reduce(function (sum, model) {
					return sum + model.get('amount');
				}, 0).toFixed(2));
			}.bind(this));
			this.donationAmountText.setText('$' + GLOBAL.gameData.donationCollection.filter({
				student: GLOBAL.gameData.student.get('id')
			}).reduce(function (sum, model) {
				return sum + model.get('amount');
			}, 0).toFixed(2));
		}.bind(this));

 		this.mapItemView = new MapItemView({
 			parent: this
		});
		this.addSubview(this.mapItemView);

		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			image: "resources/images/backgrounds/home_bg.jpg",
			opacity: 1
		});

		var mapView = new MapView({parent: this});

		this.addSubview(mapView);

		this.hiText = new TextView({
			parent: this,
			x: 170,
			y: 75,
			width: 200,
			height: 100,
			horizontalAlign: 'left',
			text: "Hi,",
			fontFamily: gameConstants.MAIN_FONT,
			size: 28,
			color: '#ef7c21',
			canHandleEvents: false
		});

		this.youhaveraisedText = new TextView({
			parent: this,
			x: 170,
			y: 125,
			width: 200,
			height: 100,
			horizontalAlign: 'left',
			text: "You have raised",
			fontFamily: gameConstants.MAIN_FONT,
			color: '#ef7c21',
			size: 28,
			canHandleEvents: false
		});

		this.usernameText = new TextView({
			parent: this,
			x: 210,
			y: 72,
			width: 200,
			height: 100,
			horizontalAlign: 'left',
			text: "username",
			fontFamily: gameConstants.MAIN_FONT,
			color: '#3e3e3e',
			size: 34,
			canHandleEvents: false
		});

		this.donationAmountText = new TextView({
			parent: this,
			x: 390,
			y: 120,
			width: 200,
			height: 100,
			horizontalAlign: 'left',
			text: "$0.00",
			fontFamily: gameConstants.MAIN_FONT,
			color: '#3e3e3e',
			size: 44,
			canHandleEvents: false
		});

		this.HomeButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 76,
		    x: 20,
		    y: 930,
		    images: {
		      up: "resources/images/buttons/home.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    },
		    on: {
		      up: bind(this, function () {
		      		//this.emit('Donate');
				})
		    }
    	});

    	this.ProfileButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 80,
		    x: 130,
		    y: 930,
		    images: {
		      up: "resources/images/buttons/profile.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    },
		    on: {
		      up: bind(this, function () {
		      		this.emit('Profile');
				})
		    }
    	});

    	this.AvatarImage = new ImageView({
    		parent: this,
			x: 30,
			y: 100,
			width: 100,
			height: 100,
			image: "resources/images/backgrounds/avatar.png",
			opacity: 1
    	})

		this.DonationsButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 80,
		    x: 240,
		    y: 930,
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
		    x: 350,
		    y: 930,
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

    	this.SocialButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 80,
		    x: 460,
		    y: 930,
		    images: {
		      up: "resources/images/buttons/social.png"
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
