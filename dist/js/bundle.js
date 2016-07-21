/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var CabinetModule = __webpack_require__(1);

	window.cabinetModule = new CabinetModule({
		el: document.querySelector('.cabinet-module'),
		debug: false
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

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
		this.velocity_f = 0.03;
		this.velocityCachePos = {};
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

		    	(function (i) {

					// set the style
					var layer = 'layer' + i;

					// calculate the velocity
					this.getVelocity(layer, i);

					var x = this.velocityCachePos[layer].x;
					var y = this.velocityCachePos[layer].y;

					this.setStyle(this.layers[i], x, y);

		    	}.call(this, i), 0);

		    }

		    // callback
			requestAnimationFrame(this.onAnimationFrame.bind(this));

		}

		this.getVelocity = function (layer, index) {

			// define if doesn't exist
			if (typeof this.velocityCachePos[layer] === 'undefined') {
				this.velocityCachePos[layer] = {
					x: this.x ? this.x : 0,
					y: this.y ? this.y : 0
				};
			}

			if (this.ix && this.iy) {
				this.velocityCachePos[layer].x += (this.ix - this.velocityCachePos[layer].x) * this.velocity_f;
				this.velocityCachePos[layer].y += (this.iy - this.velocityCachePos[layer].y) * this.velocity_f;
			}

		}

		this.setStyle = function (element, x, y) {

			var friction = this.getFriction(element);

			// set by vendor
			this.setByVendor.call(this, element, x, y, friction);

		}

		this.setByVendor = function (element, x, y, friction) {

			// element.style.webkitTransform = null;
			// element.style.MozTransform = null;
			// element.style.msTransform = null;
			// element.style.oTransform = null;
			element.style.transform = 'translate3d(' + this.calcByFriction(x, friction.x) + '%, ' + this.calcByFriction(y, friction.y) * 10 + '%, 0)';

		}

		this.getFriction = function (element) {

			var x = element.getAttribute('data-friction-x');
			var y = element.getAttribute('data-friction-y');

			x = parseFloat(x);
			y = parseFloat(y);

			return {
				x: x,
				y: y
			};

		}

		this.calcByFriction = function (value, friction) {

			return (value * 10) * friction;

		}

		this.onMouseMove = function (event) {

			// update positions if current hovered element is child of module
			if (this.module.contains(event.target)) {
				this.calcPositions.call(this, event);
			}

		}

		this.calcPositions = function (event) {

			this.bounds = this.module.getBoundingClientRect();

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
				this.ax = (event.clientX - this.x) / this.w;
				this.ay = (event.clientY - this.y) / this.h;

			} else {

				this.ix, this.iy, this.ax, this.ay = 0;

			}

			if (this.debug) {
				console.log('w: ' + this.w + ', h: ' + this.h + ', x: ' + this.x + ', y: ' + this.y + ', cx: ' + this.cx + ', this.cy: ' + this.cy + ', ix: ' + this.ix + ', iy: ' + this.iy + ', ax: ' + this.ax + ', ay: ' + this.ay);
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

/***/ }
/******/ ]);