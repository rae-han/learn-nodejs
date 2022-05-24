const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
  if(err) {
    throw err;
  }

  console.log(data); // <Buffer eb 82 ... 2e>
  console.log(typeof data); // object
  console.log(data.toString()); // 나를 읽어주세요.
})