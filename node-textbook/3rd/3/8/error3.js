const fs = require('fs');

setInterval(() => fs.unlink('./abcdefg.js'), 1000)