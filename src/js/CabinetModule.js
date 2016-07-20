function CabinetModule (params) {

	// Error handler
	if (typeof params === 'undefined' || typeof params.el === 'undefined') {
		throw new Error("Params missing!");
		return false;
	}

	// config
	this.debug = params.debug;

	// properties
	this.module = params.el;
	this.layers = this.module.querySelectorAll('img');
	this.bounds = this.module.getBoundingClientRect();
	this.x,
	this.y,
	this.w,
	this.h,
	this.cx,
	this.cy,
	this.ix,
	this.iy,
	this.ax,
	this.ay = null;

	// methods
	this.onAnimationFrame = function () {

		// todo: cancel if mouse is not hover the module

	    for (var i = 0; i < this.layers.length; i++) {
	    	this.setStyle(this.layers[i], this.x, this.y);
	    }

	    // callback
		requestAnimationFrame(this.onAnimationFrame.bind(this));

	}

	this.setStyle = function (element, x, y) {

		var friction = element.getAttribute('data-friction');

		// cast
		friction = parseFloat(friction);

		if (this.debug) {
			console.log('friction', friction);
		}

	}

	this.onMouseMove = function (event) {

		this.calcPositions.call(this, event);

	}

	this.calcPositions = function (event) {

		// box module origin (top/left) positions
		this.x = this.bounds.left;
		this.y = this.bounds.top;

		// box module size
		this.w = this.bounds.width;
		this.h = this.bounds.height;

		// box module center
		this.cx = this.w / 2;
		this.cy = this.h / 2;

		if (typeof event !== 'undefined') {

			// offset from center
			this.ix = (event.clientX - this.x - this.cx) / this.cx;
			this.iy = (event.clientY - this.y - this.cy) / this.cy;

			// amount from origin (top/left)
			this.ax = event.clientX / this.w;
			this.ay = event.clientY / this.h;

		} else {

			this.ix, this.iy, this.ax, this.ay = 0;

		}

		if (this.debug) {
			console.log('w: ' + this.w + ', h: ' + this.h + ', x: ' + this.x + ', y: ' + this.y + ', cx: ' + this.cx + ', this.cy: ' + this.cy + ', ix: ' + this.ix + ', iy: ' + this.iy);
		}

	}

	this.setEventListeners = function () {

		window.addEventListener('mousemove', this.onMouseMove.bind(this));

	}

	// start event listeners
	this.setEventListeners();

	// initialse animation
	requestAnimationFrame(this.onAnimationFrame.bind(this));

}

module.exports = CabinetModule;