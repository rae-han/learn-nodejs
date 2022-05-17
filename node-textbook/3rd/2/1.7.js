// const condition = true;

// const promise = new Promise((resolve, reject) => {
//   condition ? resolve('성공') : reject('실패');
// })

// promise
//   .then(message => {
//     console.log(1, message)
//     return message;
//   })
//   .then(message => {
//     console.log(2, message)
//   })
//   .catch(error => {
//     console.log(error)
//   })
//   .finally(() => {
//     console.log('finally');
//   })

// promise
//   .then(message1 => new Promise((resolve, reject) => {
//     console.log('in 1', message1)
//     resolve(message1)
//   }))
//   .then(message2 => new Promise((resolve, reject) => {
//     console.log('in 2', message2)
//     resolve(message2)
//   }))
//   .then(message3 => new Promise((resolve, reject) => {
//     console.log('in 3', message3)
//     resolve(message3)
//   }))
//   .catch(error => {
//     console.error(error)
//   })
// // in 1 성공
// // in 2 성공
// // in 3 성공

// const promise1 = Promise.resolve('성공!');
// const promise2 = Promise.resolve('성공!!');

// Promise.all([promise1, promise2])
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => console.error(error));
// // [ '성공!', '성공!!' ]

const promise1 = Promise.resolve('성공!');
const promise2 = Promise.resolve('성공!!');

(async () => {
  for await (promise of [promise1, promise2]) {
    console.log(promise)
  }
})();
// 성공!
// 성공!!