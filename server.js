/*jshint esversion: 8 */
/*jshint node: true*/

//  IMPORTS
var http = require("http");
var url = require("url");
var fs = require('fs');

//  SERVER SETUP
var path = url.parse(request.url).pathname;
var server = http.createServer(function(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.write("This is Test Message");
  response.end();
});

//  SERVER START
server.listen(8082);

case '/index.html':
fs.readFile(__dirname + path, function(data) {
  response.writeHead(200, {
    'Content-Type': 'text/hml'
  });
  response.write(data);
  response.end();
});
