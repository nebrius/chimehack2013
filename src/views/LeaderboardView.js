import animate;
import ui.View as View;
import ui.TextView as TextView;
import ui.resource.Image as Image;
import src.constants.gameConstants as gameConstants;
import ui.ImageView as ImageView;
import ui.widget.ButtonView as ButtonView;
import ui.ScrollView as ScrollView;
import src.models.Donation as Donation;
import src.constants.gameConstants as gameConstants;

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
			image: "resources/images/backgrounds/leaderboard_bg.jpg",
			opacity: 1
		});

		GLOBAL.gameData.on('loaded', function () {
			this.usernameText.setText(GLOBAL.gameData.student.get('name'));
			GLOBAL.gameData.donationCollection.on('added', function () {
				this.donationAmountText.setText('$' + GLOBAL.gameData.donationCollection.filter({
					student: GLOBAL.gameData.student.get('id')
				}).reduce(function (sum, model) {
					return sum + model.get('amount');
				}, 0).toFixed(2));
				createTable();
			}.bind(this));
			this.donationAmountText.setText('$' + GLOBAL.gameData.donationCollection.filter({
				student: GLOBAL.gameData.student.get('id')
			}).reduce(function (sum, model) {
				return sum + model.get('amount');
			}, 0).toFixed(2));
			createTable();
		}.bind(this));

		this.category = 'classmates';

		var createTable = function () {
				var student = GLOBAL.gameData.student,
					studentCollection,
					buckets = {};
				GLOBAL.gameData.donationCollection.values().forEach(function (donation) {
					switch(this.category) {
						case 'school':
							var school = GLOBAL.gameData.studentCollection.modelWithId(donation.get('student')).get('school');
							if (!buckets[school]) {
								buckets[school] = 0;
							}
							buckets[school] += donation.get('amount');
							break;
						case 'grade':
							var donationStudent = GLOBAL.gameData.studentCollection.modelWithId(donation.get('student'));
							if (donationStudent.get('school') == student.get('school')) {
								var grade = donationStudent.get('grade');
								if (!buckets[grade]) {
									buckets[grade] = 0;
								}
								buckets[grade] += donation.get('amount');
							}
							break;
						case 'class':
							var donationStudent = GLOBAL.gameData.studentCollection.modelWithId(donation.get('student'));
							if (donationStudent.get('school') == student.get('school') &&
								donationStudent.get('grade') == student.get('grade')
							) {
								var classname = donationStudent.get('classname');
								if (!buckets[classname]) {
									buckets[classname] = 0;
								}
								buckets[classname] += donation.get('amount');
							}
							break;
						case 'classmates':
							var donationStudent = GLOBAL.gameData.studentCollection.modelWithId(donation.get('student'));
							var name = donationStudent.get('name');
							if (!buckets[name]) {
								buckets[name] = 0;
							}
							buckets[name] += donation.get('amount');
							break;
					}
				}.bind(this));
				sortedBuckets = Object.keys(buckets).map(function (bucket) {
					return {
						name: bucket,
						amount: buckets[bucket]
					};
				}).sort(function (a, b) {
					if (a.amount < b.amount) {
						return 1;
					}
					if (a.amount > b.amount) {
						return -1;
					}
					return 0;
				});
				rows.forEach(function (row) {
					row.removeFromSuperview();
				})
				rows = [];
				for (var i = 0, len = sortedBuckets.length; i < len; i++) {
					createRow(i, sortedBuckets[i].name, sortedBuckets[i].amount);
				}
			}.bind(this),
			rows = [],
			createRow = function(position, name, amount) {
				var ROW_HEIGHT = 110;
				var container = new View({
						superview: this,
						height: ROW_HEIGHT,
						x: 0,
						y: position * ROW_HEIGHT + 342
					});
				rows.push(container);
				new TextView({
					parent: container,
					x: 45,
					y: 0,
					width: 200,
					height: ROW_HEIGHT,
					horizontalAlign: 'left',
					text: '$' + amount.toFixed(2),
					fontFamily: gameConstants.MAIN_FONT,
					color: '#3e3e3e',
					size: 32,
					canHandleEvents: false
				});
				new TextView({
					parent: container,
					x: 200,
					y: 0,
					width: 400,
					height: ROW_HEIGHT,
					horizontalAlign: 'left',
					text: name,
					fontFamily: gameConstants.MAIN_FONT,
					color: '#3e3e3e',
					size: 32,
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

		this.schoolButton = new ButtonView({
			superview: this,
			width: 120,
			height: 100,
			x: 25,
			y: 250,
			size: 26,
			title: '',
			on: {
				up: bind(this, function () {
					this.category = 'school';
					createTable();
				})
			}
		});

		this.gradeButton = new ButtonView({
			superview: this,
			width: 120,
			height: 100,
			x: 160,
			y: 255,
			size: 26,
			title: '',
			on: {
				up: bind(this, function () {
					this.category = 'grade';
					createTable();
				})
			}
		});

		this.classButton = new ButtonView({
			superview: this,
			width: 120,
			height: 100,
			x: 310,
			y: 260,
			size: 26,
			title: '',
			on: {
				up: bind(this, function () {
					this.category = 'class';
					createTable();
				})
			}
		});

		this.classButton = new ButtonView({
			superview: this,
			width: 120,
			height: 100,
			x: 460,
			y: 260,
			size: 26,
			title: '',
			on: {
				up: bind(this, function () {
					this.category = 'classmates';
					createTable();
				})
			}
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
	}
});