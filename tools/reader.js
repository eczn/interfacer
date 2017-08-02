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

shell.cp('-R', path.join(config.BASE, 'template/js/'), config.output);
shell.cp('-R', path.join(config.BASE, 'template/css/'), config.output);


var list = goThroughDisk(config.output); 
