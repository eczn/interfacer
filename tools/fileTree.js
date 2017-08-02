// fileTree.js
var fs = require('fs'); 
var path = require('path'); 
// var config = require('../config'); 

function treeInit(root){
	var rootStat = fs.statSync(root); 

	if (rootStat.isDirectory()){
		var list = fs.readdirSync(root);

		return list.reduce((acc, cur) => {
			acc[cur] = treeInit(
				path.join(root, cur)
			); 
			return acc; 
		}, {}); 
	} else {
		return root; 
	}
}

function tree2list(root, pathAcc){
	var list = Object.keys(root); 

	return list.map(sub => {

		if (typeof root[sub] === 'object') {
			var nextPath = pathAcc + sub + '/'; 
			return `
				<ul class="file-tree" where="${sub}">
					<a class="header" href="${ nextPath }">${ nextPath }</a>
					${tree2list(root[sub], nextPath)}
				</ul>
			`; 
		} else {
			return ''; 
		}
	}).join(''); 
}

module.exports = {
	init: treeInit, 
	toList: root => tree2list(root, '/')
}; 
