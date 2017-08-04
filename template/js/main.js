// main.js
function scrollHandle(){
	var rate = getRate(); 
	var rateStr = rate * 100 + '%'; 
	// console.log(rate, rateStr)
	$('.top').css('width', rateStr); 
}

function getRate(){
	var $b = $('body'); 

	

	var total = $b.height() - window.innerHeight; 
	var now = $b.scrollTop(); 
	console.log('cha, now, total', now, total); 
	console.log('rate:', now / total); 
	if (total <= 0){
		return 1; 
	} else {
		return now / total; 	
	}
}

window.onload = function(){
	document.addEventListener('DOMContentLoaded', function(){
		FastClick.attach(document.body);
		console.info('Fastclick Ready');
	}, true);

	$('.show-file-tree').click(function(){
		$('body').attr('side-open', this.checked ? '√' : '×'); 
	}); 

	$(window).scroll(scrollHandle); 
	scrollHandle(); 

	var title = $('title').html()
	var $at = $(`.file-tree [where="${title}"]`)
	$at.attr('at', '√'); 

	setTimeout(function(){
		$('body').removeClass('display-hidden')
	}, 333);
}
