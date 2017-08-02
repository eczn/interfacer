// fileTree.js
var fs = require('fs'); 
var path = require('path'); 
// var config = require('../config'); 

function tree(root){
	var rootStat = fs.statSync(root); 

	if (rootStat.isDirectory()){
		var list = fs.readdirSync(root);

		return list.reduce((acc, cur) => {
			acc[cur] = tree(
				path.join(root, cur)
			); 
			return acc; 
		}, {}); 
	} else {
		return root; 
	}
}

// var r = tree(config.output); 

module.exports = tree; 
