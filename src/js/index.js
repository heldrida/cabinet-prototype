var CabinetModule = require('./CabinetModule.js');

window.cabinetModule = new CabinetModule({
	el: document.querySelector('.cabinet-module'),
	debug: true
});