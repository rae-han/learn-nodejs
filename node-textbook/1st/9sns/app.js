const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig(); // passport 미들웨어를 통해 local, kakao passport 등록
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('Success db connected')
  })
  .catch((err) => {
    console.log(err)
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize()); // req 객체에 passport 설정을 심는다.
app.use(passport.session()); 
// req.session 객체에 passport 정보를 저장한다.
// req.session 객체는 express-session에서 생성하는 것이므로 express-session 미들웨어보다 뒤에 연결해야 한다.
// ----
// 로그인 요청에 들어와서 라우터에 도달하기 전에 passport.session 미들웨어가 passport.deserializerUser 메서드를 호출한다.
// req.session에 저장된 아이디로 데이터베이스에서 사용자 조회를 한다.
// 조회된 사용자 정보를 req.user에 저장한다.
// 라우터에서 req.user 객체 사용 가능
// Passport는 로그인 시의 동작을 전략(strategy)라는 용어로 표현한다.

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없음.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals. message = err.message;
  res.locals.error = process.env.MODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});