const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  fs.accessSync('file_uploads');
} catch (error) {
  console.error(error);
  console.log('file_uploads 폴더 없음. 폴더 생성.')
  fs.mkdirSync('file_uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'file_uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().getTime() + ext);
    }
  }),
  limits: { fileSize: 20*1024*1024 }
})

app.post('/post', upload.array('image'), (req, res, next) => {
  console.log(req.files.map((file) => file.filename));
  console.log(req.body);

  res.status(200).send('success');
});

app.listen(8888)