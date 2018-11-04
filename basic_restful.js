http = require('http');
url = require('url');
items = [];

var server = http.createServer(function(req, res){
	switch(req.method){
		case "POST":
			var item = "";
			req.setEncoding('utf8');
			req.on('data', function(chunk){
				item += chunk;
			});

			req.on('end', function(){
				items.push(item);
				res.end("OK\n");
			});
			break;

		case "GET":
			send = "";
			items.forEach(function(item, i){
				send += i + ') ' + item + '\n';
			});
			res.setHeader('Content-Length', Buffer.byteLength(send));
			res.end(send);
			break;


		case "DELETE":
			var path = url.parse(req.url).pathname;
			var i = parseInt(path.slice(1), 10);

			if(isNaN(i)){
				res.statusCode = 400;
				res.end('invalid item id\n');
			}
			else if(!items[i]){
				res.statusCode = 404;
				res.end('Item not found\n');
			}
			else{
				items.splice(i, 1);
				res.end('OK\n');
			}
			break;
	}
});

/*
nitin@nitin-Inspiron-15-7000-Gaming:~$ curl -d 'buy groceries' http://localhost:3000
OK
nitin@nitin-Inspiron-15-7000-Gaming:~$ curl -d 'buy lamborghini' http://localhost:3000
OK
nitin@nitin-Inspiron-15-7000-Gaming:~$ curl http://localhost:3000
0) buy groceries
1) buy lamborghini
nitin@nitin-Inspiron-15-7000-Gaming:~$ curl -X DELETE http://localhost:3000/1
OK
nitin@nitin-Inspiron-15-7000-Gaming:~$ curl http://localhost:3000
0) buy groceries
nitin@nitin-Inspiron-15-7000-Gaming:~$ 

*/

server.listen(3000);
console.log('listeing to port 3000');
