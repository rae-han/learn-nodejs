const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
  console.log('1: ', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
  console.log('2: ', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
  console.log('3: ', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
  console.log('4: ', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
  console.log('5: ', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
  console.log('6: ', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
  console.log('7: ', Date.now() - start);
});
crypto.pbkdf2(pass, salt, 1_000_000, 128, 'sha512', () => {
  console.log('8: ', Date.now() - start);
});

// 2:  1571
// 4:  1579
// 1:  1581
// 3:  1597
// 7:  3139
// 6:  3149
// 8:  3236
// 5:  3243