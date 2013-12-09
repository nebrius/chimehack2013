import animate;
import ui.View as View;
import ui.TextView as TextView;
import ui.ImageView as ImageView;
import menus.constants.menuConstants as menuConstants;
import menus.views.components.BoxBorderView as BoxBorderView;
import menus.views.components.BoxDialogView as BoxDialogView;
import menus.views.components.DialogBackgroundView as DialogBackgroundView;
import src.constants.gameConstants as gameConstants;
import ui.widget.ButtonView as ButtonView;
import ui.resource.Image as Image;
import ui.SpriteView as SpriteView;

exports = Class(DialogBackgroundView, function (supr) {
	this.init = function (opts) {

		this.mapItemType = '';

		supr(this, 'init', arguments);

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

		this.designView();
	};

	this.startAnimation = function() {
		animate(this).wait(500)
		.then(bind(this, function() {
			this.avatarView.startAnimation('default', {loop: false, callback: this.showAvatar(this)});	
		}))
	}

	this.showAvatar = function(that) {
		that.avatarImage.style.visible = true;
	}

	this.designView = function() {

		/*this.background = new ImageView({
			parent: this._dialogView,
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH - 130,
			height: 600,
			image: "resources/images/backgrounds/market_info.png",
			opacity: 1
		});*/

		this.closeButton = new ButtonView({
		    superview: this._dialogView,
		    width: 70,
		    height: 70,
		    x: 395,
		    y: 5,
		    images: {
		      up: "resources/images/buttons/close_button.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    },
		    on: {
		      up: bind(this, function () {
		      		this.hide();
		      		this.avatarImage.style.visible = false;
				})
		    }
    	});

		this.logoutButton = new ButtonView({
		    superview: this._dialogView,
		    width: 140,
		    height: 60,
		    x: 180,
		    y: 550,
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
		 
					this.hide();
					this.avatarImage.style.visible = false;
				})		      
		    },
		    title: "Ok",
		    text: {
		      color: "#ffffff",
		      size: 24,
		      autoFontSize: false,
		      autoSize: false
		    }
    	});

    	this.avatarImage = new ImageView({
    		parent: this._dialogView,
			x: 100,
			y: 100,
			width: 290,
			height: 370,
			image: "resources/images/animation/avatar_default_13.png",
			visible: false
    	})

		this.avatarView = new SpriteView({
		  superview: this._dialogView,
		  loop: false,
		  x: 100,
		  y: 100,
		  width: 290,
		  height: 370,
		  url: 'resources/images/animation/avatar',
		  frameRate: 8,
		  zIndex: 100
		});

			

	}
});