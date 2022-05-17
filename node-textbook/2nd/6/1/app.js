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
// app.use(morgan('dev')); // [http 메서드] [주소] [http 상태 코드] [응답속도] - [응답 바이트]
app.use(morgan('combined'));

app.use('/', express.static(path.join(__dirname, 'public')));
// static 은 정적인 파일들을 제공하는 라우터 역할을 한다.
// 기본적으로 제공되기 때문에 express 객체 안에서 꺼내 장착하면 된다.
// 함수의 인수로 정적 파일들이 담겨 있는 폴더를 지정하면 된다.
// 위 예제로 /public에 있는 폴더, 파일을 /로 접근 할수 있다.

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어 준다.
// 보통 폼 데이터나 AJAX 쵸엉의 데이터를 처리한다.
// 멀티파트(이미지, 동영상, 파일) 데이터는 처리하지 못하므로 multer 모듈을 사용한다.
// 예전에는 body-parser를 직접 설치해야 했지만 익스프레스 4.16.0 버전부터 익스프레스에 일부 기능이 내장되어 따로 설치할 필요가 없다.
// 단, body-parser는 json, URL-encoded 형식의 데이터 외에도 Raw, Text 형식의 데이터를 추가로 해석할수 있다.
// Raw는 요청의 본문이 버터 데이터일 때, Text는 텍스트 데이터일 때 해석하는 미들웨어이다.

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  },
  name: 'session-cookie',
}))
app.use((req, res, next) => {
  // console.log(req.url); // req,headers.cookie
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