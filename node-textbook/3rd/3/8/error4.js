process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);
});

setInterval(() => {
  throw new Error('에러 발생!!');
}, 1_000);

setTimeout(() => console.log('실행!'), 2_000);