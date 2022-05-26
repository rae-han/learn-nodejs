const http = require('http');

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url)
});

server.listen(8080);