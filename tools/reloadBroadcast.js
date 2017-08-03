// ws.js
var ws = require('nodejs-websocket'); 

var conns = []; 

var server = ws.createServer(function (conn) {
	conns.push(conn); 

    if (conns.length >= 100){
        conns = conns.slice(-100); 
    }

    console.log("[[ New LiveReload Connection ]]"); 

    conn.on("text", (str) => {
        console.log("Received:"+str)
        conn.sendText(
            `[[ ${str.toUpperCase()} ]] 啊？ 你说什么？我只是一介打杂的广播员。`
        );
    });

    conn.on("close", () => {});

    conn.on("error", function(err){
    	// console.log(err)
    });
}).listen(35353); 


function reloadBroadcast() {
	conns.forEach(conn => {
		conn.sendText('[[ Reloading ]]'); 
	})
}

module.exports = reloadBroadcast; 
