const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2');
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write('이 문장을 씁니다. \n');
writeStream.write('한 번 더 씁니다.');
writeStream.end();