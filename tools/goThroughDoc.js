var fs = require('fs'); 
var path = require('path');
var config = require('../config'); 
var md = require('./md'); 
var renders = require('./tpl'); 
var tree = require('./fileTree'); 

var fileFilter = /(css|js|images)/g; 
var readdirSync = r => fs.readdirSync(r).filter(e => !fileFilter.test(e)); 

var treeCache = {}; 
function listGenerator(doc, base){
	// 缓存命中 
	if (treeCache[doc]) return treeCache[doc]; 
	
	// delete outputTree.css; 
	// delete outputTree.js; 
	// delete outputTree.images; 

	var outputTree = tree.init(doc); 
	var res = tree.toList(outputTree, '/' + base + '/'); 
	treeCache[doc] = res; 

	return res; 
}

var goThroughDoc = root => {
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
				goThroughDoc(fileLocation)
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
	var routes = node.index.replace(config.output, '').split(path.sep); 
	var [ name ] = routes.slice(-2, -1); 
	var [ __, base ] = routes; 
	if (name === '') name = config.docName; 

	// 拼接回绝对路径 
	// base = path.join(config.output, base); 
	
	// 模版渲染
	var indexHTML = renders.index({
		name: name, 
		base: base, 
		list: node.list, 
		md: mdHTML, 
		htmlList: listGenerator(path.join(config.output, base), base)
	}); 

	// 把文件名改成 .html 后缀 并写入到与 .md 文件一样的目录中
	var htmlLocation = node.index.replace(/\.md$/, '.html'); 
	fs.writeFileSync(htmlLocation, indexHTML); 
}

module.exports = goThroughDoc;
