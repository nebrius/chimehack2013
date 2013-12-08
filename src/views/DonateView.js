import ui.View as View;
import ui.ImageView as ImageView;
import src.constants.gameConstants as gameConstants;
import ui.TextView as TextView;
import ui.widget.ButtonView as ButtonView;
import src.lib.parseUtil as ParseUtil;
import ui.TextEditView as TextEditView;
import src.models.Donor as Donor;
import src.models.Donation as Donation;

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
		    x: 480,
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
			x: 30,
			y: 425,
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
			x: 30,
			y: 530,
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
					var email = this.emailEditView.getText(),
						donor = GLOBAL.gameData.donorCollection.modelWithId(email);
					function saveDonation() {
						GLOBAL.gameData.donationCollection.add(new Donation({
							amount: 7,
							time: (new Date()).toString(),
							student: GLOBAL.gameData.student.get('id'),
							donor: email
						}));
						GLOBAL.gameData.donationCollection.save(function () {
							this.emit('Back');
						}.bind(this));
					}
					if (!donor) {
						GLOBAL.gameData.donorCollection.add(donor = new Donor({
							id: email,
							name: email.substring(0, email.indexOf('@'))
						}));
						GLOBAL.gameData.donorCollection.save(function () {
							saveDonation.call(this);
						}.bind(this));
					} else {
						saveDonation.call(this);
					}
				})
			}
		});
	};
});
