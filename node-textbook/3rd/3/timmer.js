const timeout1 = setTimeout(() => console.log('1.5초 후 실행'), 1_500);
const timeout2 = setTimeout(() =>  console.log('실행되지 않음'), 3_000)
const interval = setInterval(() => console.log('1초마다 실행'), 1_000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval)
}, 2_500);

const immediate1 = setImmediate(() => console.log('즉시 실행'));
const immediate2 = setImmediate(() => console.log('실행되지 않음'));

clearImmediate(immediate2);

// 즉시 실행
// 1초마다 실행
// 1.5초 후 실행
// 1초마다 실행