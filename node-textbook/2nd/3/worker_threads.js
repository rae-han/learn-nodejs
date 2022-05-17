const { Worker, isMainThread, parentPort } = require('worker_threads');

console.log(Worker);
console.log(isMainThread);
console.log(parentPort);

if(isMainThread) {
  console.log(__filename);
  const worker = new Worker(__filename)
  console.log(worker)
}

