const http = require('http');

const server = http.createServer((req, res) => {
  console.log('create server');

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!!</h1>');
  // res.end('');
})

server.listen(8080, () => {
  console.log('listen 8080 port!')
})