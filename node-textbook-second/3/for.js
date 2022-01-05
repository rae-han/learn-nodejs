const arr = [1, 2, 3];
const obj = {
  a: 1,
  b: 2,
  c: 3,
}

for (const item of arr) {
  console.log(item);
}
// for (const item of obj) {
//   console.log(item);
// }

for (const item in arr) {
  console.log(item)
}

for (const item in obj) {
  console.log(item)
}

console.log(Object.entries(obj));

