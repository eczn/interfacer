// ll.js

var reload = new WebSocket('ws://127.0.0.1:35353'); 

reload.onopen = function(evt){
	console.log('[[ Interfacer LiveReload Ready ]]'); 
}

reload.onmessage = function(evt) {
	if (evt.data === '[[ Reloading ]]') {
		// 重载 
		location.reload(); 
	}
}

reload.onclose = function(evt) {
	console.log('[[ Interfacer LiveReload Closed ]]'); 
}  
