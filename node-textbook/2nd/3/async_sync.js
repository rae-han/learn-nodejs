const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
  if(err) throw err;

  console.log('a 1번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
  if(err) throw err;

  console.log('a 2번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
  if(err) throw err;

  console.log('a 3번', data.toString());
});

let data = fs.readFileSync('./readme.txt');
console.log('b 1번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('b 2번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('b 3번', data.toString());