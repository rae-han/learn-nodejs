const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
// const key = '12345678901234567890123456789012';
// const iv = '1234567890123456';
const key = 'abcdefghijklmnopqrstuvwxyz123456';
const iv = '1234567890123456';

const cipher = crypto.createCipheriv(algorithm, key, iv);
console.log('cipher', cipher);

let result = cipher.update('암호화할 문장', 'utf8', 'base64');
console.log('result', result);
let cipherFinal = cipher.final('base64');
console.log('cipherFinal', cipherFinal);

result += cipherFinal;

console.log('암호화: ', result);

//

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, 'base64', 'utf8');
console.log('result2', result2);
let decipherFianl = decipher.final('utf8');
console.log('decipherFianl', decipherFianl);
result2 += decipherFianl;
console.log('복호화', result2);

//
// console.log(crypto.getCiphers());
const ciphers = crypto.getCiphers().reduce((pre, cur, idx) => `${pre}${idx === 0 ? '' : ' / ' }${cur}` , '');
console.log(ciphers);