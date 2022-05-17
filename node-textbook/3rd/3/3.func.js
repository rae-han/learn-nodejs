const { odd, even } = require('./3.var');

function checkOddOrEven(num) {
  return num%2 ? odd : even;
}

module.exports = checkOddOrEven;