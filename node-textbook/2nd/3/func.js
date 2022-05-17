// const { odd, even } = require('./var');

// function checkOddOrEven(num) {
//   console.log('func.js')
//   if(num%2) {
//     return odd;
//   } else {
//     return even;
//   }
// }

// module.exports = checkOddOrEven;

import { odd, even } from './var';

function checkOddOrEven(num) {
  console.log('func.mjs')
  if(num%2) {
    return odd;
  } else {
    return even;
  }
}

export default checkOddOrEven;