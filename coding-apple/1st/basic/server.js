const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(express.urlencoded({extended: true}));

const mongoUrl = 'mongodb+srv://raehan809:fogks0619@cluster0.axmgh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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
});

MongoClient.connect(mongoUrl, (err, client) => {
  if(err) return console.log(err);

  app.listen(8080, () => {
    console.log('on 8080 port');
  });
});

// app.listen(8080, () => {
//   console.log('on 8080 port');
// });