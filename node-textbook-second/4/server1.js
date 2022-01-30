const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('hello node')
  res.end('hello server')
}).listen(8080, () => {
  console.log('in port 8080');
})