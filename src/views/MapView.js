import ui.View as View;
import ui.ImageView as ImageView;
import src.constants.gameConstants as gameConstants;
import ui.TextView as TextView;
import ui.widget.ButtonView as ButtonView;
import src.lib.parseUtil as ParseUtil;
import device;
import ui.ScrollView as ScrollView;
import src.views.MapItemView as MapItemView;

exports = Class(ScrollView, function (supr) {

	this.init = function(opts) {

        this._totalWidth = 900;
        this._totalHeight = 900;

        this._touch = {};
        this._touchIDs = [];

        var scale = 1;
        this._fingerOne = null;
        this._fingerTwo = null;
        this._pinch = false;
        this._pinchScale = 1;
        this._pinchPoints = {};
        this._pinchStartDistance = 0;

        this.parent = opts.parent;

        opts = merge(
            opts,
            {
                useLayoutBounds: true,
                x:0,
                y:229,
                scrollX: true,
                scrollY: true,
                scrollBounds: {
                        minX: 0,
                        minY: 0,
                        maxX: this._totalWidth * scale,
                        maxY: this._totalHeight * scale
                },
                bounce: false,
                minScale: 0.5,
                maxScale: 2,
                width: gameConstants.GAME_WIDTH,
				height: gameConstants.GAME_HEIGHT - 350
            }
        );

		/*opts = merge(opts, {
			x: 0,
			y: 229,
			//scrollX: false,
			useLayoutBounds: true,
            //scrollBounds: {
            //	minX: 0,
            //	minY: 0
            //},
			//bounceRadius: 30,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT - 350,
		});*/

		supr(this, 'init', [opts]);

		this.buildView();

		this.scrollTo(200,200,550);
	};

	this.load = function() {

	}

	this.buildView = function() {

		this.mapImage = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: 900,
			height: 900,
			image: "resources/images/backgrounds/map_1400.png",
			opacity: 1
		});

		this.HomeButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 76,
		    x: 420,
		    y: 100,
		    images: {
		      up: "resources/images/buttons/home.png"
		      //down: "resources/images/buttons/brown_button_down.png"
		    },
		    on: {
		      up: bind(this, function () {
		      		this.parent.mapItemView.show();

				})		      
		    }
    	});

    	this.ProfileButton = new ButtonView({
		    superview: this,
		    width: 80,
		    height: 80,
		    x: 230,
		    y: 200,
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
		    x: 340,
		    y: 250,
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
		    x: 250,
		    y: 400,
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


	};

    /*this.onInputStart = function (evt, pt) {
            if (!this._touchIDs.length) {
                    if (this._opts.drag) {
                            this.startDrag({radius: this._opts.dragRadius * this._snapPixels});

                            if (this._anim && this._anim.hasFrames()) {
                                    this._anim.clear();
                            }

                            evt.cancel();
                    }
            }
            this._touch['_' + evt.id] = true;
            this._touchIDs = Object.keys(this._touch);
            switch (this._touchIDs.length) {
                    case 1:
                            this._fingerOne = this._touchIDs[0];
                            this._pinchPoints[this._fingerOne] = {x: evt.srcPoint.x, y: evt.srcPoint.y};
                            break;
                    case 2:
                            this._fingerTwo = this._touchIDs[1];
                            this._pinchPoints[this._fingerTwo] = {x: evt.srcPoint.x, y: evt.srcPoint.y};
                            break;
            }
            if (this._touchIDs.length === 2) {
                    this._pinchScale = this.getScale();
                    this._pinchStartDistance = this.getPinchDistance();
                    this._pinch = true;
            } else {
                    this._pinch = false;
            }
    };

    this.onDrag = function (dragEvt, moveEvt, delta) {
            this.emit('Dragged');

            if (this._pinch) {
                    this._pinchPoints['_' + moveEvt.id] = {x: moveEvt.srcPoint.x, y: moveEvt.srcPoint.y};
                    this.setScale(this.getPinchDistance() / this._pinchStartDistance * this._pinchScale);
            } else {
                    supr(this, 'onDrag', arguments);
            }
    };

       this.onDragStop = function (dragEvt, selectEvt) {
            if (this._pinch) {
                    if ('id' in dragEvt) {
                            delete this._touch['_' + dragEvt.id];
                            this._touchIDs = Object.keys(this._touch);
                    }
                    if ('id' in selectEvt) {
                            delete this._touch['_' + selectEvt.id];
                            this._touchIDs = Object.keys(this._touch);
                    }
                    if (this._touchIDs.length < 2) {
                            this._pinch = false;
                    }
            } else {
                    if ('id' in dragEvt) {
                            delete this._touch['_' + dragEvt.id];
                            this._touchIDs = Object.keys(this._touch);
                    }
                    if ('id' in selectEvt) {
                            delete this._touch['_' + selectEvt.id];
                            this._touchIDs = Object.keys(this._touch);
                    }
                    supr(this, 'onDragStop', arguments);
            }
    };

	this.onPinch = function (pinchScale) {
    	this.setScale(pinchScale);
    };

        this.getScale = function (scale) {
                return this.mapImage.style.scale;
        };

    this.setScale = function (scale) {
        var lastScale = this.mapImage.style.scale;
        scale = Math.min(Math.max(scale, this._minScale), this._maxScale);

        this.mapImage.style.scale = scale;

        var x = this.mapImage.style.x * scale / lastScale + (lastScale - scale) * this.style.width * 0.5;
        var y = this.mapImage.style.y * scale / lastScale + (lastScale - scale) * this.style.height * 0.5;

        //this.mapImage.style.x = Math.min(Math.max(x, -(this._totalWidth * scale - this.style.width)), 0);
        //this.mapImage.style.y = Math.min(Math.max(y, -(this._totalHeight * scale - this.style.height)), 0);

        this.setScrollBounds({
                minX: 0,
                minY: 0,
                maxX: this._totalWidth * scale,
                maxY: this._totalHeight * scale
        });
    };

    this.getPinchDistance = function () {
            var p1 = this._pinchPoints[this._fingerOne];
            var p2 = this._pinchPoints[this._fingerTwo];
            var dx = p2.x - p1.x;
            var dy = p2.y - p1.y;
            return Math.sqrt(dx * dx + dy * dy);
    };*/
});
