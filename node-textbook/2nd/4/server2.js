const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('hello node')
  res.end('hello server')
})

server.listen(8080, () => {
  console.log('in port 8080');
});

server.on('listening', () => {
  console.log('In port 8080')
})

const shadowServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('hello node')
})

shadowServer.listen(8081, () => {
  console.log('in port 8081');
})