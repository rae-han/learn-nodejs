const http = require('http');

const app = http.createServer((req, res) => {
  console.log('create server');
});

app.listen(8080, () => {
  console.log('on 8080 port');
})