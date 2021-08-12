const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();
const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
})

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));

app.use('/', pageRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  console.log(error)
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log('Error Function.');
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
})


// app.listen(app.get('port', () => {
//   console.log(app.get('port'), ' 번 포트에서 대기 중')
// }))
// /Users/raehan/Documents/develop/learn/nodejs/node-textbook/9sns-second/node_modules/express/lib/router/index.js:139
//   debug('dispatching %s %s', req.method, req.url);
//                                  ^

// TypeError: Cannot read property 'method' of undefined
//     at Function.handle (/Users/raehan/Documents/develop/learn/nodejs/node-textbook/9sns-second/node_modules/express/lib/router/index.js:139:34)
//     at Function.handle (/Users/raehan/Documents/develop/learn/nodejs/node-textbook/9sns-second/node_modules/express/lib/application.js:174:10)
//     at Server.app (/Users/raehan/Documents/develop/learn/nodejs/node-textbook/9sns-second/node_modules/express/lib/express.js:39:9)
//     at Object.onceWrapper (events.js:421:28)
//     at Server.emit (events.js:315:20)
//     at emitListeningNT (net.js:1352:10)
//     at processTicksAndRejections (internal/process/task_queues.js:79:21)
// [nodemon] app crashed - waiting for file changes before starting...

