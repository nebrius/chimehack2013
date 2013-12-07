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

		GLOBAL.gameData.on('loaded', function () {
			this.usernameText.setText(GLOBAL.gameData.student.get('name'));
			GLOBAL.gameData.donationCollection.on('added', function () {
				this.donationAmountText.setText('$' + GLOBAL.gameData.donationCollection.filter({
					student: GLOBAL.gameData.student.get('id')
				}).reduce(function (sum, model) {
					return sum + model.get('amount');
				}, 0).toFixed(2));
			}.bind(this));
		}.bind(this));

		var createRow = function(position, name, amount) {
				var ROW_HEIGHT = 50;
				var container = new View({
						superview: this,
						height: ROW_HEIGHT,
						x: 0,
						y: position * ROW_HEIGHT + 300
					});
				rows.push(container);
				new TextView({
					parent: container,
					x: 10,
					y: 0,
					width: 200,
					height: ROW_HEIGHT,
					horizontalAlign: 'left',
					text: '$' + amount.toFixed(2),
					fontFamily: gameConstants.MAIN_FONT,
					size: 28,
					color: '#000000',
					canHandleEvents: false
				});
				new TextView({
					parent: container,
					x: 200,
					y: 0,
					width: 200,
					height: ROW_HEIGHT,
					horizontalAlign: 'left',
					text: name,
					fontFamily: gameConstants.MAIN_FONT,
					size: 28,
					color: '#000000',
					canHandleEvents: false
				});
			}.bind(this);

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
	};
});