const fs = require('fs').promises;
const { readFile } = require('./readFilePromise')

const random = String(Math.floor(Math.random()*1000));
console.log(random)

fs.writeFile('./writeme.txt', random)
  .then(() => {
    return fs.readFile('./writeme.txt');
  })
  .then((data) => {
    readFile('./writeme.txt')
    console.log(data.toString())
  })
  .catch((error) => {
    console.log(error)
  })