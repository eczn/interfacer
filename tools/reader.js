// reader.js
var fs = require('fs'); 
var path = require('path'); 
var goThroughDisk = require('./goThroughDisk'); 
var config = require('../config'); 
var shell = require('shelljs'); 
var server = require('./server'); 

// Start Server 
server(); 

shell.rm('-r', config.output);
shell.cp('-R', config.docRoot, config.output);

setTimeout(() => {
	shell.cp('-R', path.join(config.BASE, 'template/js/'), config.output);
	shell.cp('-R', path.join(config.BASE, 'template/css/'), config.output);

	console.log('COPY SUC'); 
}, 3000)

// 
var list = goThroughDisk(config.output); 


// list = list.map(absFile => {
// 	var relative = absFile.replace(config.docRoot, ''); 

// 	var doc = md.render(
// 		fs.readFileSync(absFile).toString()
// 	); 

// 	return {
// 		relative,
// 		doc
// 	}
// }); 






// console.log(list)
