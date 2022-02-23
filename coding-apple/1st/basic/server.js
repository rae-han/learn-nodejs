const express = require('express');
const app = express();

app.get('/pet', (req, res) => {
  // res.send('GET /pet');
  res.sendFile(__dirname+'/index.html')
})

app.get('/beauty', (req, res) => {
  res.send('GET /beauty')
})

app.listen(8080, () => {
  console.log('on 8080 port');
});