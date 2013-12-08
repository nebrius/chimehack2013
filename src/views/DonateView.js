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
    	
    	this.selectOneView = new ButtonView({
    		superview: this,
    		width: 124,
    		height: 139,
    		x: 35,
    		y: 240,
		    on: {
		      up: bind(this, function () {
		      		this.selectedTwoDollarView.hide();
		      		this.selectedFiveDollarView.hide();
		      		this.selectedTenDollarView.hide();
		      		this.selectedOneDollarView.show();
				})		      
		    }
    	});
    	
    	this.selectTwoView = new ButtonView({
    		superview: this,
    		width: 124,
    		height: 139,
    		x: 159,
    		y: 240,
		    on: {
		      up: bind(this, function () {
		      		this.selectedOneDollarView.hide();
		      		this.selectedFiveDollarView.hide();
		      		this.selectedTenDollarView.hide();
		      		this.selectedTwoDollarView.show();
				})		      
		    }
    	});
    	
    	this.selectFiveView = new ButtonView({
    		superview: this,
    		width: 124,
    		height: 139,
    		x: 293,
    		y: 240,
		    on: {
		      up: bind(this, function () {
		      		this.selectedOneDollarView.hide();
		      		this.selectedTwoDollarView.hide();
		      		this.selectedTenDollarView.hide();
		      		this.selectedFiveDollarView.show();
				})		      
		    }
    	});
    	
    	this.selectTenView = new ButtonView({
    		superview: this,
    		width: 124,
    		height: 139,
    		x: 417,
    		y: 240,
		    on: {
		      up: bind(this, function () {
		      		this.selectedOneDollarView.hide();
		      		this.selectedTwoDollarView.hide();
		      		this.selectedFiveDollarView.hide();
		      		this.selectedTenDollarView.show();
				})		      
		    }
    	});
    	
    	this.selectedOneDollarView = new ImageView({
    		parent: this,
			x: 35,
			y: 240,
			width: 124,
			height: 139,
			visible: false,
			image: "resources/images/donation/one_selected.png",
			opacity: 1
    	});
    	
    	this.selectedTwoDollarView = new ImageView({
    		parent: this,
			x: 159,
			y: 240,
			width: 124,
			height: 139,
			visible: false,
			image: "resources/images/donation/two_selected.png",
			opacity: 1
    	});
    	
    	this.selectedFiveDollarView = new ImageView({
    		parent: this,
			x: 293,
			y: 240,
			width: 124,
			height: 139,
			visible: false,
			image: "resources/images/donation/five_selected.png",
			opacity: 1
    	});

		this.selectedTenDollarView = new ImageView({
    		parent: this,
			x: 417,
			y: 240,
			width: 124,
			height: 139,
			visible: false,
			image: "resources/images/donation/ten_selected.png",
			opacity: 1
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
				up: "resources/images/buttons/donate_button.png"
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
