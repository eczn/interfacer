var fs = require('fs'); 
var path = require('path');
var config = require('../config'); 
var md = require('./md'); 
var renders = require('./tpl'); 
var tree = require('./fileTree'); 

var outputTree = tree(config.output); 

var outputTreeInJSON = JSON.stringify(
	outputTree
).replace(/\\\\/g, '/'); 

var goThroughDisk = root => {
	var list = fs.readdirSync(root);

	return list.reduce((acc, file) => {
		var fileLocation = path.join(root, file); 

		var fileStat = fs.statSync(
			fileLocation
		); 

		if (fileStat.isDirectory()){
			// 这是目录 
			return acc.concat(
				goThroughDisk(fileLocation)
			)
		} else {
			// 单纯的文件 
			// console.log(
			// 	list.filter(e => e !== file), 
			// 	'and index file:', fileLocation
			// ); 
			nodeProcess({
				list: list.filter(e => e !== file), 
				index: fileLocation
			})
			return acc.concat(fileLocation); 
		}

	}, []); 
}

function nodeProcess(node){
	if (!/.md$/.test(node.index)) return 

	var mdHTML = md.render(
		fs.readFileSync(node.index).toString()
	); 

	// var name = node.index.replace(/\.\/index\.md/g, '').slice(
	// 	node.index.replace(/\.\/index\.md/g, '').lastIndexOf('/')
	// )

	var temp = node.index.split(path.sep); 

	temp = temp.slice(-2, -1); 


	var indexHTML = renders.index({
		name: temp, 
		list: node.list, 
		md: mdHTML, 
		tree: outputTreeInJSON
	}); 

	var htmlLocation = node.index.replace(/.md$/, '.html'); 
	fs.writeFileSync(htmlLocation, indexHTML); 
}

module.exports = goThroughDisk; 
