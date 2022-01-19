const fs = require('fs');

const readStream = fs.createReadStream('./readme.txt');
const writeStream = fs.createWriteStream('./wriete3');

readStream.pipe(writeStream);