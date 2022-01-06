const fs = require('fs');
const fsp = fs.promises;

fs.readFile('./readme.txt', (err, data) => {
  if(err) throw err;

  console.log(data);
  console.log(data.toString());
});

const outer = async () => {
  console.log('outer')
  const data = await fsp.readFile('./readme.txt');
  console.log(data)
  console.log(data.toString());
}
outer();

fsp.writeFile('./writeme', 'I write it')
  .then(() => fsp.readFile('./writeme'))
  .then(data => console.log(data.toString()))
  .catch(err => console.error(err))