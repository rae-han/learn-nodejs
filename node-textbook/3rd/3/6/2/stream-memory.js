// stream-memory.js 
const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big.copy.txt');

readStream.pipe(writeStream);

readStream.on('end', () => console.log('buffer: ', process.memoryUsage().rss))

// before:  21864448
// buffer:  56492032