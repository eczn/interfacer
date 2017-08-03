var fs = require('fs'); 
var path = require('path');
var config = require('../config'); 
var md = require('./md'); 
var renders = require('./tpl'); 
var tree = require('./fileTree'); 


var outputTree = tree.init(config.output); 
var fileFilter = /(css|js|images)/g; 
var readdirSync = r => fs.readdirSync(r).filter(e => !fileFilter.test(e)); 

// 删掉多余的。 
delete outputTree.css; 
delete outputTree.js; 
delete outputTree.images; 

var htmlList = tree.toList(outputTree); 

var goThroughDisk = root => {
	// var list = fs.readdirSync(root);
	var list = readdirSync(root); 

	return list.reduce((acc, file) => {
		var fileLocation = path.join(root, file); 

		var fileStat = fs.statSync(
			fileLocation
		); 

		if (fileStat.isDirectory()){
			// 是文件夹 继续递归 
			return acc.concat(
				goThroughDisk(fileLocation)
			)
		} else {
			// 普通文件 处理之 
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
	// 如果是根目录则命名为 config.docName 
	var [ name ] = node.index.replace(config.output, '').split(path.sep).slice(-2, -1); 
	if (name === '') name = config.docName; 


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
