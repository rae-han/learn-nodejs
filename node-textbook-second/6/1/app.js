const express = require('express');
const path = require('path');
// npm i morgan cookie-parser express-session dotenv
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();
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