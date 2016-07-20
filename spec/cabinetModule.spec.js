var CabinetModule = require('../src/js/CabinetModule.js');
var cabinetModule = null;

describe("Cabinet module", function () {

	beforeEach(function () {

		var fixture =	'<div class="cabinet-module" style="width: 500px; height: 500px;">' +
						'<img style="width: 100%; height: 100%;" src="dist/images/layer1.png?201607201308" data-friction="0.8">' +
						'<img style="width: 100%; height: 100%;" src="dist/images/layer2.png?201607201308" data-friction="0.6">' +
						'<img style="width: 100%; height: 100%;" src="dist/images/layer3.png?201607201308" data-friction="0.5">' +
						'<img style="width: 100%; height: 100%;" src="dist/images/layer4.png?201607201308" data-friction="0.2">' +
						'</div>';

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


});