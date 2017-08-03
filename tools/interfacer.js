// reader.js
var fs = require('fs'); 
var path = require('path'); 
var goThroughDoc = require('./goThroughDoc'); 
var config = require('../config'); 
var shell = require('shelljs'); 
var server = require('./server'); 
var renders = require('./tpl'); 
var docWatch = require('./docRootWatcher'); 

function interfacerInit(){
	shell.rm('-r', config.output);
	shell.cp('-R', config.docRoot, config.output);

	shell.cp('-R', path.join(config.BASE, 'template/js/'), config.output);
	shell.cp('-R', path.join(config.BASE, 'template/css/'), config.output);
}


function interfacer(){
	var docs = fs.readdirSync(config.docRoot); 

	// 处理文本们 
	docs.map(doc => {
		return goThroughDoc(path.join(
			config.output, doc
		));
	});

	// 渲染 entryIndex
	var entryIndex = renders.entry({
		mainTitle: config.mainTitle || 'Interfacer 文档', 
		welcome: config.welcome || '欢迎来到 Interfacer', 
		list: docs
	}); 

	fs.writeFileSync(path.join(
		config.output, 'index.html'
	), entryIndex)
}


module.exports = function(_){
	// if (_.generate){
	// 	interfacerInit();
	// 	interfacer(); 
	// } 
	interfacerInit(); 
	interfacer(); 
	// if (_.server){
	// 	interfacerInit();
	// 	interfacer(); 
		// Start Server 
	server(); 
	// }

	// if (_.livereload){
		// Add 
	docWatch.add(function(){
		interfacerInit(); 
		interfacer(); 
	}); 
	docWatch.start(); 
	// }
}

