const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

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

