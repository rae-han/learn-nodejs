const fs = require('fs').promises;

console.log('start');

fs.readFile('./readme.txt')
  .then(data => {
    console.log('1번', data.toString());
    return fs.readFile('./readme.txt')
  })
  .then(data => {
    console.log('2번', data.toString());
    return fs.readFile('./readme.txt')
  })
  .then(data => {
    console.log('3번', data.toString());
    console.log('end')
  })
  .catch(err => console.log(err))

// start
// 1번 저를 여러 번 읽어보세요.
// 2번 저를 여러 번 읽어보세요.
// 3번 저를 여러 번 읽어보세요.
// end