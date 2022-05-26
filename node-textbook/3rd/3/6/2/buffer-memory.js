const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const data = fs.readFileSync('./big.txt');
fs.writeFileSync('./big.copy.txt', data);

console.log('buffer: ', process.memoryUsage().rss)

// before:  21811200
// buffer:  772734976
