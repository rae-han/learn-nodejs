const fs = require('fs');

console.log('start');

let data = fs.readFileSync('./readme.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('3번', data.toString());

console.log('end')
// start
// 1번 저를 여러 번 읽어보세요.
// 2번 저를 여러 번 읽어보세요.
// 3번 저를 여러 번 읽어보세요.
// end