const fs = require('fs').promises;

fs.copyFile('./readme.txt', './writeme.txt')
  .then(() => console.log('복사 완료'))
  .catch((err) => console.log(err))