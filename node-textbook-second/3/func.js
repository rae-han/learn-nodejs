const { odd, even } = require('./var');

function checkOddOrEven(num) {
  console.log('func.js')
  if(num%2) {
    return odd;
  } else {
    return even;
  }
}

module.exports = checkOddOrEven;