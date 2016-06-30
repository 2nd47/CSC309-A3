/* CSC309 Assignment 3 Summer 2016 */
/* By Daniil Kouznetsov */

var http = require('http');
var fs = require('fs');

function run_server(db) {
  var hostname = '127.0.0.1';
  var port = 3000;

  var server = http.createServer(function(req, res) {
    if(req.url === '/' || req.url === '/index.html') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World\n');
    }
    else {
      res.statusCode = 404;
      res.end();
    }
  });
}

server.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function main() {
  var db = init_db();
  run_server(db);
}

main();
