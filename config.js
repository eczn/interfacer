// config.js
var path = require('path'); 

module.exports = {
	BASE: __dirname, 
	docRoot: path.join(__dirname, './docs'), 
	output: path.join(__dirname, './output'),
	PORT: 3322, 
	docName: 'Interfacer 使用手册'
}
