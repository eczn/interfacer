// tpl.js
var tpl = require('tplser'); 
var path = require('path'); 
var renders = {}; 
var fs = require('fs'); 

var llScript = fs.readFileSync(
	path.join(__dirname, './ll.js')
).toString(); 

module.exports = renders; 

tpl.push({
	inter: {
		llScript: `<script> ${llScript} </script>`
	}
})

renders.index = tpl.fromFile(path.join(__dirname, '../template/index.html'), {
	compress: true
}); 

renders.entry = tpl.fromFile(path.join(__dirname, '../template/entry.html'), {
	compress: true
}); 

