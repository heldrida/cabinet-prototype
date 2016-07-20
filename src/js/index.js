function CabinetModule (params) {

	// properties
	this.module = params.el;
	this.imgList = this.module.querySelectorAll('img');

	console.log(this.module);

}

window.cabinetModule = new CabinetModule({
	el: document.querySelector('.cabinet-module')
});

module.exports = CabinetModule;