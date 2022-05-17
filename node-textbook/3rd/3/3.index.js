const { odd, even } = require('./3.var');
const checkNum = require('./3.func'); // 이름 변경 가능

function checkStringLengthOddOrEven(str) {
  return str.length ? odd : even;
}

console.log(checkNum(10));
console.log(checkStringLengthOddOrEven('hello'));