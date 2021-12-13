const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile('./server2.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    res.end(data);
  } catch (error) {
    console.error(error);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    res.end(error.message);
  }
}).listen(8080)

server.on('listening', () => {
  console.log('port number 8080')
})
server.on('error', error => {
  console.error(error)
})