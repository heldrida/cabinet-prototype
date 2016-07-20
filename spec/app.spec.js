var App = require('../src/js/index.js');

describe("Test the App object", function () {
    var app = new App();

    it('to verify that it returns a specific value', function() {
        expect(app.calc(50)).toBe(100);
    });
});