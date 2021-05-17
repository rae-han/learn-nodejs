const fs = require('fs').promises;

fs.readFile('./readme.txt')
  .then((data) => {
    console.log(data);
    console.log(data.toString())
  })
  .catch((err) => {
    console.log(err)
  })

const readFile = async (filename) => {
  try {
    let response = await fs.readFile(filename)
    console.log(response)
    console.log(response.toString())
  } catch (error) {
    console.log(error)
  }
}

exports.readFile = readFile;


