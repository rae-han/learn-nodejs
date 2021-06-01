const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
// app.use(morgan('combined'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  },
  name: 'seesion-cookie',
}))

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
})
app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행');
  next();
}, (req, res) => {
  console.log('에러가 있을 때')
  throw new Error('에러처리 미들웨어로')
})

app.use((err, req, res, next) => {
  console.log('# error')
  console.error(err);
  res.status(500).send(err.message);
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'port')
});

