const { Worker, isMainThread, parentPort } = require('worker_threads');

if(isMainThread) { // 부모일 때
  console.log('1. parent start')
  const worker = new Worker(__filename);
  worker.on('message', message => console.log('2. from worker', message));
  // worker.on('exit', () => console.log('3. worker exit'));
  // worker.postMessage('ping')
  // worker.postMessage('ping')
  // worker.postMessage('ping')
  // worker.postMessage('ping')

  let interval = setInterval(() => worker.postMessage('ping'), 1000)
} else {
  console.log('2. children start')
  parentPort.on('message', value => {
    console.log('1. from parent', value);
    parentPort.postMessage('pong');
    // parentPort.close();
  })
  console.log('3. children end')
}

