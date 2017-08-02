// tpl.js
var tpl = require('tplser'); 
var renders = {}; 

module.exports = renders; 

renders.index = tpl.fromFile('../template/index.html', {
	compress: true
}); 


