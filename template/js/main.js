// main.js
document.addEventListener('DOMContentLoaded', function(){
	FastClick.attach(document.body);
	console.info('Fastclick Ready');
}, true);

$('.show-file-tree').click(function(){
	$('body').attr('side-open', this.checked ? '√' : '×'); 
}); 