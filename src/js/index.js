console.log('Hello app!');

function App (val) {

	console.log('App initialised!');

	this.calc = function (val) {
		return val * 2;
	}

}

module.exports = App;