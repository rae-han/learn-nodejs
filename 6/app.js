const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
dotenv.config();

// routers
const indexRouter = require('./routes')
const userRouter = require('./routes/user')

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

// app.use('/', indexRouter);
// app.use('/user', userRouter);

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('upload folder created why ? not found');
  fs.mkdirSync('uploads')
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize : 10*1024*1024 },
})

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
})
app.get('/', (req, res, next) => { 
  console.log('GET / 요청에서만 실행');
  req.data = '데이터 넣기'
  // next();
  next('route');
}, (req, res, next) => {
  console.log(req.data)
  // throw new Error('에러처리 미들웨어로')
  // next();
})
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
  console.log(req.files, req.body);
  res.send('ok');
})

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((err, req, res, next) => {
  console.log('# error')
  console.error(err);
  res.status(500).send(err.message);
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'port')
});
