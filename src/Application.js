import device as Device;
//import AudioManager;
//import src.sounds.soundManager as soundManager;
import src.constants.gameConstants as gameConstants;
import src.views.DonateView as DonateView;
import src.views.ErrorView as ErrorView;
import src.views.HomeView as HomeView;
import src.views.LeaderboardView as LeaderboardView;
import src.views.TitleView as TitleView;
import ui.View as View;
import ui.StackView as StackView;
import src.lib.parse as Parse;
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

		//this.scaleUI();
		//logger.log(Parse.Parse.VERSION);
		//Parse.Parse.initialize("J3gALSUBlUMfOSAGHyaEqXGVmyrlXOOsa8TiCh7u", "0gqBOcrMEu08EdlaHaszYexc9o4LXuua4UeY2jYC");

		/*ajax.post({
		  'url':'https://api.parse.com/1/events/AppOpened',
		  'headers':{
		    'X-Parse-Application-Id':'J3gALSUBlUMfOSAGHyaEqXGVmyrlXOOsa8TiCh7u',
		    'X-Parse-REST-API-Key':'0gqBOcrMEu08EdlaHaszYexc9o4LXuua4UeY2jYC',
		    'Content-Type':'application/json'
		  },
		  data:{

		  },
		  success:function(result) { 
		    // app open was saved.
		  },
		  error:function(error) { 
		    // error saving analytics.  message in error.responseText
		  }
		});*/

		var rootView = new StackView({
			superview: this,
			x: 0,
			y: 0,
			width: BOUNDS_WIDTH,
			height: BOUNDS_HEIGHT,
			clip: true,
			backgroundColor: '#000000'
		});

		var homeView = new HomeView();

		var titleView = new TitleView();

		titleView.on('Start', function () {
			rootView.push(homeView);
			homeView.load();
		});

		rootView.push(titleView);

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

		titleView.checkForLoggedInUser();
	};
	
	this.launchUI = function () {

	};
	
	this.initAudio = function () {

		//soundManager.playGameBackground();
	};
});
