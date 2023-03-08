//nodejs_test.js
var http = require('http');
var content = function(req, res){
        res.end("Welcome to dgsw's Devops!" + "\n");
        res.writeHead(200);
}
var server = http.createServer(content);
server.listen(8080);