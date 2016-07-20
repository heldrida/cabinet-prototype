var CabinetModule = require('../src/js/CabinetModule.js');
var cabinetModule = null;

describe("Cabinet module", function () {

	beforeEach(function () {
		var fixture =	'<div class="cabinet-module">' +
						'<img src="dist/images/layer1.png?201607201308" data-friction="0.8">' +
						'<img src="dist/images/layer2.png?201607201308" data-friction="0.6">' +
						'<img src="dist/images/layer3.png?201607201308" data-friction="0.5">' +
						'<img src="dist/images/layer4.png?201607201308" data-friction="0.2">' +
						'</div>';

		document.body.insertAdjacentHTML('afterbegin', fixture);

		cabinetModule = new CabinetModule({
			el: document.querySelector('.cabinet-module'),
			debug: false
		});
	});

	describe("Cabinet module attribute calculations", function () {
		it('should calculate the center correctly', function () {
			expect(1).toBe(1);
		});
	});


});