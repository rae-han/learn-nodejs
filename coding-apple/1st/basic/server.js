const express = require('express');

const app = express();
app.use(express.urlencoded({extended: true}));

app.get('/pet', (req, res) => {
  // res.send('GET /pet');
  res.sendFile(__dirname+'/index.html')
})

app.get('/beauty', (req, res) => {
  res.send('GET /beauty')
})

app.get('/write', (req, res) => {
  res.sendFile(__dirname+'/views/write.html');
})

app.post('/add', (req, res) => {
  console.log(req.body);
  res.send('전송완료')

})

app.listen(8080, () => {
  console.log('on 8080 port');
});