const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme.txt');
const zlibStrem = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme.txt.gz');

readStream.pipe(zlibStrem).pipe(writeStream);
