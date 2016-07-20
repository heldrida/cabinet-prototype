function CabinetModule (params) {

	// properties
	this.module = params.el;
	this.layers = this.module.querySelectorAll('img');
	this.bounds = null;
	this.x = null;
	this.y = null;
	this.w = null;
	this.h = null;
	this.cx = null;
	this.cy = null;
	this.ix = null;
	this.iy = null;

	// methods
	this.onAnimationFrame = function () {

		// todo: cancel if mouse is not hover the module

	    for (var i = 0; i < this.layers.length; i++) {
	    	this.setPosition(this.layers[i], this.x, this.y);
	    }

	    // callback
		requestAnimationFrame(this.onAnimationFrame.bind(this));

	}

	this.setPosition = function (element, x, y) {

	}

	this.onMouseMove = function (event) {

		this.bounds = this.module.getBoundingClientRect();

		this.calcPositions.call(this, event);

		console.log('w: ' + this.w + ', h: ' + this.h + ', x: ' + this.x + ', y: ' + this.y + ', cx: ' + this.cx + ', this.cy: ' + this.cy + ', ix: ' + this.ix + ', iy: ' + this.iy);

	}

	this.calcPositions = function () {

		// box module top/left positions
		this.x = this.bounds.left;
		this.y = this.bounds.top;

		// box module size
		this.w = this.bounds.width;
		this.h = this.bounds.height;

		// box module center
		this.cx = this.w / 2;
		this.cy = this.h / 2;

		// offset from center
		this.ix = (event.clientX - this.x - this.cx) / this.cx;
		this.iy = (event.clientY - this.y - this.cy) / this.cy;

	}

	this.setEventListeners = function () {

		window.addEventListener('mousemove', this.onMouseMove.bind(this));

	}

	// start event listeners
	this.setEventListeners();

	// initialse animation
	requestAnimationFrame(this.onAnimationFrame.bind(this));

}

window.cabinetModule = new CabinetModule({
	el: document.querySelector('.cabinet-module')
});

module.exports = CabinetModule;