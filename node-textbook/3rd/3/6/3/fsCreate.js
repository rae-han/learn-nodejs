const fs = require('fs').promises;
const constants = require('fs').constants;

const { F_OK, W_OK, R_OK } = constants;
console.log(F_OK, W_OK, R_OK)

fs.access('./folder', constants.F_OK /* 파일 존재 여부 */ | constants.W_OK /* 읽기 권한 여부 */ | constants.R_OK /* 쓰기 권한 여부 */)
  .then(() => {
    console.log('then');
    return Promise.reject('이미 폴더 있음');
  })
  .catch(err => {
    console.log('err');
    if(err.code === 'ENOENT') {
      console.log('폴더 없음');
      return fs.mkdir('./folder');
    }
  })
  .then(() => {
    console.log('폴더 만들기 성공')
    return fs.open('./folder/file.js', 'w');
  })
  .then(fd => {
    console.log('빈 파일 만들기 성공', fd);
    return fs.rename('./folder/file.js', './folder/newfile.js');
  })
  .then(() => {
    console.log('이름 바꾸기 성공');
  })
  .catch(err => {
    console.error(err);
  })