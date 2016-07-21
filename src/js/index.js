var dat = require('dat-gui');
var CabinetModule = require('./CabinetModule.js');

window.cabinetModule = new CabinetModule({
	el: document.querySelector('.cabinet-module'),
	debug: false,
	dat_gui_instance: new dat.GUI()
});