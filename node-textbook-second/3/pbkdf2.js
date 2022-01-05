const crypto = require('crypto');

const _BASE64 = 'base64';

const base64 = crypto.createHash('sha512').update('비밀번호').digest(_BASE64);
const hex = crypto.createHash('sha512').update('비밀번호').digest('hex');


crypto.randomBytes(64, (err, buf) => {
  console.log(buf);
  const salt = buf.toString(_BASE64);
  console.log(salt);

  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    console.log(key);
    console.log(key.toString(_BASE64));
  })
});