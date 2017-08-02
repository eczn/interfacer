var fs = require('fs'); 
var path = require('path');
var config = require('../config'); 
var md = require('./md'); 
var renders = require('./tpl'); 
var tree = require('./fileTree'); 


var outputTree = tree.init(config.output); 

// 删掉多余的。 
delete outputTree.css; 
delete outputTree.js; 
delete outputTree.images; 

var htmlList = tree.toList(outputTree); 

var goThroughDisk = root => {
	var list = fs.readdirSync(root);

	return list.reduce((acc, file) => {
		var fileLocation = path.join(root, file); 

		var fileStat = fs.statSync(
			fileLocation
		); 

		if (fileStat.isDirectory()){
			return acc.concat(
				goThroughDisk(fileLocation)
			)
		} else {
			nodeProcess({
				list: list.filter(e => e !== file), 
				index: fileLocation
			})
			return acc.concat(fileLocation); 
		}

	}, []); 
}

function nodeProcess(node){
	// 不渲染非 .md 后缀的文件 
	if (!/.md$/.test(node.index)) return 

	// Markdown渲染 
	var mdHTML = md.render(
		fs.readFileSync(node.index).toString()
	); 
	
	// 文件所在目录的名字 
	var name = node.index.split(path.sep).slice(-2, -1); 

	// 模版渲染
	var indexHTML = renders.index({
		name: name, 
		list: node.list, 
		md: mdHTML, 
		htmlList: htmlList
	}); 

	// 把文件名改成 .html 后缀 并写入到与 .md 文件一样的目录中
	var htmlLocation = node.index.replace(/\.md$/, '.html'); 
	fs.writeFileSync(htmlLocation, indexHTML); 
}

module.exports = goThroughDisk; 
