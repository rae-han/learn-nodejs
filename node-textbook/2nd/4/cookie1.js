const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie);
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test; mc=t' });
  res.writeHead(200, { 'Set-Cookie': 'mycookie2=test;' });
  res.end('Hello Cookie');
});

server.listen(8080, () => {
  console.log('8080 port')
})