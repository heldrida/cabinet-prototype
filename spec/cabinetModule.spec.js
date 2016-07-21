var CabinetModule = require('../src/js/CabinetModule.js');
var cabinetModule = null;

describe("Cabinet module", function () {

	beforeEach(function () {

		var fixture =	'<div class="cabinet-module" style="width: 500px; height: 500px;">' +
						'<img style="width: 100%; height: 100%;" src="dist/images/layer1.png?201607201308" data-friction-x="0.8" data-friction-y="0.8">' +
						'<img style="width: 100%; height: 100%;" src="dist/images/layer2.png?201607201308" data-friction-x="0.6" data-friction-y="0.6">' +
						'<img style="width: 100%; height: 100%;" src="dist/images/layer3.png?201607201308" data-friction-x="0.5" data-friction-y="0.5">' +
						'<img style="width: 100%; height: 100%;" src="dist/images/layer4.png?201607201308" data-friction-x="0.2" data-friction-y="0.2">' +
						'</div>'

		document.body.insertAdjacentHTML('afterbegin', fixture);

		cabinetModule = new CabinetModule({
			el: document.querySelector('.cabinet-module'),
			debug: false
		});

	});

	describe("Cabinet module attribute calculations", function () {

		beforeEach(function () {
			cabinetModule.calcPositions();
		});

		it('should calculate the box size correctly', function () {
			var size = {
				w: cabinetModule.w,
				h: cabinetModule.h
			};
			var expectSize = {
				w: 500,
				h: 500
			};
			expect(size).toEqual(expectSize);
		});

		it('should calculate the box origin', function () {
			var origin = {
				x: cabinetModule.x,
				y: cabinetModule.y
			};
			expect(origin.x).not.toBeNull();
			expect(origin.y).not.toBeNull();
		});

		it('should calculate the center correctly', function () {
			var center = {
				cx: cabinetModule.cx,
				cy: cabinetModule.cy
			};
			var expectCenter = {
				cx: 250,
				cy: 250
			};
			expect(center).toEqual(expectCenter);
		});

	});

	describe("Friction data getter", function () {
		var element;
		beforeEach(function () {
			element = document.querySelector('.cabinet-module img:nth-child(1)');
		});
		it('foo', function () {
			expect(cabinetModule.getFriction(element)).toEqual({
				x: 0.8,
				y: 0.8
			});
		});
	});


});