// watcher.js
var chokidar = require('chokidar');
var config = require('../config'); 
var reloadBroadcast = require('./reloadBroadcast');
var watcher; 

var todos = [function(){
	console.log('WRITE'); 
}]; 

module.exports = {
	start: () => {
		var timer = null; 
		watcher = chokidar.watch([config.docRoot], {
			ignored: /[\/\\]\./,
			persistent: true,
			ignoreInitial: true
			// awaitWriteFinish: true
		});

		watcher.on(['all'], function(name, where, stat){
			todos.forEach(fn => fn()); 

			clearTimeout(timer); 
			timer = setTimeout(reloadBroadcast, 100); 
		});
	}, 
	add: cb => todos.push(cb)
}
