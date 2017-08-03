#!/usr/bin/env node 
var shell = require('shelljs/global');
var fs = require('fs'); 
var path = require('path'); 
var interfacer = require('./tools/interfacer'); 
var pkg = require('./package'); 

var program = require('commander');

var startWithConfig = function(fileWhere){
	var config = fs.readFileSync(fileWhere).toString(); 
	// 写入 
	fs.writeFileSync(path.join(__dirname, 'config.js'), config);

	// Start!
	interfacer({
		server: true, 
		livereload: true
	});
}

// version 
program.version(pkg.version)
	.option('-c, --config [file]')
	.parse(process.argv);
// config 
// program.command('config <file>').action()； 

// program.command('start').action(function(){
	// console.log('[[ Start Interfacer ]]'); 
// }); 

// program.parse(process.argv);

if (typeof program.config === 'string'){
	console.log(program.config)
	startWithConfig(program.config); 
} else {
	interfacer({
		server: true, 
		livereload: true
	});
}
