// config.js
var path = require('path'); 

module.exports = {
	BASE: __dirname, 
	docRoot: path.join(__dirname, './doc'), 
	output: path.join(__dirname, './output'),
	PORT: 3322
}