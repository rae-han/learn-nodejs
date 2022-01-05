const crypto = require('crypto');

const base64_1 = crypto.createHash('sha512').update('비밀번호').digest('base64');
const hex = crypto.createHash('sha512').update('비밀번호').digest('hex');
const base64_2 = crypto.createHash('sha512').update('다른 비밀번호').digest('base64');

console.log(base64_2);
console.log(base64_1);
console.log(hex);

const base64_3 = crypto.createHash('sha512').update('nopqrst').digest('base64');
const base64_4 = crypto.createHash('sha512').update('qvew').digest('base64');
const base64_5 = crypto.createHash('sha512').update('abcdefgh').digest('base64');

console.log(base64_3);
console.log(base64_4);
console.log(base64_5);