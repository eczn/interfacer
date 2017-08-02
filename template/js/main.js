// main.js

document.addEventListener('DOMContentLoaded', function(){
	FastClick.attach(document.body);
	console.info('Fastclick Ready');
}, true);

function tree(root, pathAcc){
	console.log(root); 

	var list = Object.keys(root); 

	return list.map(sub => {
		// next 
		if (typeof root[sub] === 'object') {
			var nextPath = pathAcc + '/' + sub; 
			return `
				<ul class="file-tree" where="${sub}">
					<a class="header" href="${ nextPath }">${ nextPath }</a>
					${tree(root[sub], nextPath)}
				</ul>
			`; 
		} else {
			return ''; 
		}
	}).join(''); 
}

var res = tree(root, ''); 

$('.file-tree-root').html(res); 
