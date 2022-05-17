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