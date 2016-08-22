// http://workshop.chromeexperiments.com/examples/gui
var dat = require('dat-gui');
var Stats = require('stats.js');
var CabinetModule = require('./CabinetModule.js');

window.cabinetModule = new CabinetModule({
	el: document.querySelector('.cabinet-module'),
	debug: false,
	dat_gui_instance: new dat.GUI(),
	stats: new Stats(),
	hasParent: false
});