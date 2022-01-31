const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie);
  res.wireteHead(201, { 'Set-Cookie': 'mycookie=test' });
  res.end('Hello Cookie');
});

server.listen(8080, () => {
  console.log('8080 port')
})