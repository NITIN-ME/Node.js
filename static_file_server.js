var path = require('path');
var url = require('url');
var http = require('http');
var fs = require('fs');

var rootdir = __dirname;

var server = http.createServer(function(req, res){
	var tempurl = url.parse(req.url); 
	var finalurl = path.join(rootdir, tempurl.pathname);
	
	fs.stat(finalurl, function(err, stat){
		if(err){
			if('ENOENT' == err.code){
				res.statusCode = 404;
				res.end("Not Found!\n");
			}
			else{
				res.statusCode = 500;
				res.end("Internal Server Error\n");
			}
		}
		else{
			res.writeHead(200, {"Content-Type":"text/html"});
			filestream = fs.createReadStream(finalurl);
			filestream.pipe(res);
		}
	});
});

server.listen(3000);
console.log("listeing to port 3000");
