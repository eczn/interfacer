// fileTree.js
var fs = require('fs'); 
var path = require('path'); 
var tpl = require('./tpl'); 
// var config = require('../config'); 


var nodeName = p => {
	var routes = p.split('/');

	var name = routes.slice(-2, -1).join(''); 

	return name.split('').map(e => {
		if (e === ' '){
			return `<span class="single-word" style="display: inline;">${e}</span>`
		} else {
			return `<span class="single-word">${e}</span>`
		}
	}).join(''); 
}


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
					<a class="header" href="${ nextPath }">${ nodeName(nextPath) }</a>
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
	toList: (root, pathAcc) => tree2list(root, pathAcc)
}; 
