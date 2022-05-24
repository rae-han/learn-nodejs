const fs = require('fs').promises;

const main = async () => {
  try {
    const result = await fs.readFile('./readme.txt')
    console.log(result); // <Buffer eb 82 98 eb a5 bc 20 ec 9d bd ec 96 b4 ec a3 bc ec 84 b8 ec 9a 94 2e>
    console.log(result.toString()); // 나를 읽어주세요.
  } catch (err) {
    console.error(err);
  }
}
main();