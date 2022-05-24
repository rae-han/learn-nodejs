// createBigFile.js
const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for(let i=0; i< 10_000_000; i++) {
  file.write('엄청나게 큰 파일을 만듭니다. 약 1GB 크기의 파일입니다.');
}

file.end();