// Import request
var request = require('request');

// Set to OUTPUT
request('https://cloud.arest.io/7cg83u/mode/5/o', function() {

	// Set to HIGH
	request('https://cloud.arest.io/7cg83u/digital/5/0');

});