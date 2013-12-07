import ui.View as View;
import ui.TextView as TextView;
import ui.ImageView as ImageView;
import menus.constants.menuConstants as menuConstants;
import menus.views.components.BoxBorderView as BoxBorderView;
import menus.views.components.BoxDialogView as BoxDialogView;
import menus.views.components.DialogBackgroundView as DialogBackgroundView;
import src.constants.gameConstants as gameConstants;
import src.lib.parseUtil as ParseUtil;

exports = Class(DialogBackgroundView, function (supr) {
	this.init = function (opts) {

		this.parent = opts.parent;

		supr(this, 'init', arguments);

		this.style.visible = false;

		//this.parseUtil = new ParseUtil();

		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: 100,
			y: 200,
			width: gameConstants.GAME_WIDTH - 140,
			height: gameConstants.GAME_HEIGHT - 340,
			title: 'Map Item',
			closeCB: opts.closeCB ? bind(this, 'hide', opts.closeCB) : false,
			backCB: opts.backCB ? bind(this, 'hide', opts.backCB) : false
		});

		var itemStyle = menuConstants.MENU_ITEM;
		var textStyle = menuConstants.MENU_TEXT;
		var menu = this;
	};
});