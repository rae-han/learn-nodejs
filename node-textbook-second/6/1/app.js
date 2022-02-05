const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

// middleware
app.use((req, res, next) => {
  console.log(req.url); // req,headers.cookie
  console.log('모든 요청에 다  실행된다.');
  next();
})

app.get('/', (req, res, next) => {
  console.log('get / middleware');
  next();
}, (req, res, next) => {
  console.log('get / second middleware');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 간다.')
});

app.get('/', (req, res) => {
  // res.send('Hello, Express');
  console.log(path.join(__dirname, '/index.html'));
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
})