import device;
//import AudioManager;
//import src.sounds.soundManager as soundManager;
import src.constants.gameConstants as gameConstants;
import src.views.DonateView as DonateView;
import src.views.ErrorView as ErrorView;
import src.views.HomeView as HomeView;
import src.views.LeaderboardView as LeaderboardView;
import src.views.TitleView as TitleView;
import src.views.Instruction1View as Instruction1View;
import src.views.Instruction2View as Instruction2View;
import ui.View as View;
import ui.StackView as StackView;
import util.ajax as ajax;

var BOUNDS_WIDTH = 576;
var BOUNDS_HEIGHT = 1024;

exports = Class(GC.Application, function () {

	this.initUI = function() {
		this.engine.updateOpts({
			alwaysRepaint: true,
			clearEachFrame: true,
			keyListenerEnabled: false,
			logsEnabled: true,
			noReflow: true,
			showFPS: false,
			scaleUI: true,
			preload: ['resources/images', 'resources/sounds']
		});

		this.scaleUI();

		var rootView = new StackView({
			superview: this,
			x: 0,
			y: 0,
			width: BOUNDS_WIDTH,
			height: BOUNDS_HEIGHT,
			clip: true,
			backgroundColor: '#000000'
		});

		var instruction1View = new Instruction1View();
		var instruction2View = new Instruction2View();
		var homeView = new HomeView();
		var titleView = new TitleView();

		titleView.on('Start', function () {
			rootView.push(instruction1View);
		});

		rootView.push(titleView);

		instruction1View.on('Continue', function () {
			rootView.push(instruction2View);
		});

		instruction2View.on('Continue', function () {
			rootView.push(homeView);
			homeView.load();
		});

		var leaderboardView = new LeaderboardView();
		var donateView = new DonateView();

		//titleView.on('Signin', function () {
		//	this.gameModel.getCurrentUser();
		//});

		homeView.on('Donate', function () {
			rootView.push(donateView);
		});

		homeView.on('LoadLeaderboard', function () {
			rootView.push(leaderboardView);
		});

		donateView.on('Back', function () {
			rootView.pop();
		});

		leaderboardView.on('Back', function () {
			rootView.pop();
		});

		this.initAudio();
	};

	this.scaleUI = function () {
		if (device.height > device.width) {
			this.baseWidth = BOUNDS_WIDTH;
			this.baseHeight = device.height * (BOUNDS_WIDTH / device.width);
			this.scale = device.width / this.baseWidth;
		} else {
			this.baseWidth = BOUNDS_HEIGHT;
			this.baseHeight = device.height * (BOUNDS_HEIGHT / device.width);
			this.scale = device.height / this.baseHeight;
		}
		this.view.style.scale = this.scale;
	};

	this.launchUI = function () {

	};

	this.initAudio = function () {

		//soundManager.playGameBackground();
	};
});
