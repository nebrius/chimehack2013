import animate;
import ui.View as View;
import ui.TextView as TextView;
import ui.resource.Image as Image;
import src.constants.gameConstants as gameConstants;
import ui.ImageView as ImageView;
import ui.widget.ButtonView as ButtonView;
import ui.ScrollView as ScrollView;
import src.models.Donation as Donation;

exports = Class(View, function (supr) {
	this.init = function (opts) {

		opts = merge(opts, {
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			backgroundColor: '#ef6e07'
		});

		supr(this, 'init', [opts]);

		this.designView();
	};

	this.designView = function() {

		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			image: "resources/images/backgrounds/social_bg.jpg",
			opacity: 1
		});

		this.HomeButton = new ButtonView({
			superview: this,
			width: 80,
			height: 76,
			x: 20,
			y: 930,
			size: 26,
			images: {
				up: "resources/images/buttons/home.png"
				//down: "resources/images/buttons/brown_button_down.png"
			},
			on: {
			  up: bind(this, function () {
					this.emit('Back');
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
					this.emit('Donate');
				})
			}
		});

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