const http = require('http');
// http.createServer((req, res) => {
//   console.log('server on!')
//   res.writeHead(200, { 'Content-Type': 'hext.html; charset=utf-8' });
//   res.write('<h1>Hello Node</h1>');
//   res.end('<p>Hello Server!</p>')
// }).listen(8080, () => {
//   console.log('port number 8080')
// })

const server = http.createServer((req, res) => {
  console.log('server on!')
  res.writeHead(200, { 'Content-Type': 'hext.html; charset=utf-8' });
  res.write('<h1>Hello Node</h1>');
  res.end('<p>Hello Server!</p>')
}).listen(8080)

server.on('listening', () => {
  console.log('port number 8080')
})
server.on('error', error => {
  console.error(error)
})