import ui.View as View;
import ui.TextView as TextView;
import ui.ImageView as ImageView;
import menus.constants.menuConstants as menuConstants;
import menus.views.components.BoxBorderView as BoxBorderView;
import menus.views.components.BoxDialogView as BoxDialogView;
import menus.views.components.DialogBackgroundView as DialogBackgroundView;
import src.constants.gameConstants as gameConstants;
import ui.widget.ButtonView as ButtonView;
//import src.lib.parseUtil as ParseUtil;

exports = Class(DialogBackgroundView, function (supr) {
	this.init = function (opts) {

		this.parent = opts.parent;

		supr(this, 'init', arguments);

		//this.style.visible = false;

		//this.parseUtil = new ParseUtil();

		//opts.closeCB = {};

		//this.style.x = 60;
		//this.style.y = 240;

		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: 53,
			y: 250,
			width: gameConstants.GAME_WIDTH - 100,
			height: gameConstants.GAME_HEIGHT - 400,		
			//title: 'Map Item',
			closeCB: opts.closeCB ? bind(this, 'hide', opts.closeCB) : false,
			backCB: opts.backCB ? bind(this, 'hide', opts.backCB) : false
		});

		//var itemStyle = menuConstants.MENU_ITEM;
		//var textStyle = menuConstants.MENU_TEXT;
		//var menu = this;
		this.designView();
	};

	this.designView = function() {

		this.background = new ImageView({
			parent: this._dialogView,
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH - 130,
			height: 600,
			image: "resources/images/backgrounds/market_info.png",
			opacity: 1
		});

		this.closeButton = new ButtonView({
		    superview: this._dialogView,
		    width: 80,
		    height: 80,
		    x: 385,
		    y: 5,
		    images: {
		      up: "resources/images/buttons/close_button.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    },
		    on: {
		      up: bind(this, function () {
		      		this.hide();
				})
		    }
    	});

		this.donateButton = new ButtonView({
		    superview: this._dialogView,
		    width: gameConstants.GAME_WIDTH - 104,
		    height: 165,
		    x: 0,
		    y: 455,
		    images: {
		      up: "resources/images/buttons/donate_button.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    },
		    on: {
		      up: bind(this, function () {
		      		this.parent.emit('Donate');
				})
		    }
    	});

	}
});