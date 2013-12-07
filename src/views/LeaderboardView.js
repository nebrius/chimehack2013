import animate;
import ui.View as View;
import ui.TextView as TextView;
import ui.resource.Image as Image;
import src.constants.gameConstants as gameConstants;
import ui.ImageView as ImageView;
import ui.widget.ButtonView as ButtonView;

exports = Class(View, function (supr) {

	this.init = function (opts) {
		
		opts = merge(opts, {
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			backgroundColor: '#000000'
		});

		supr(this, 'init', [opts]);

		this.designView();
	}

	this.designView = function() {

    	this.BackButton = new ButtonView({
		    superview: this,
		    width: 130,
		    height: 70,
		    x: 10,
		    y: 10,
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
		      		this.emit('Back');
				})		      
		    },
		    title: "Back",
		    text: {
		      color: "#ffffff",
		      size: 36,
		      fontFamily: gameConstants.MAIN_FONT,
		      autoFontSize: false,
		      autoSize: false
		    }
    	});
	}
});