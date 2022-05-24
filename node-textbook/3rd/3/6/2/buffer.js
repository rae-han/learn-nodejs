const buffer = Buffer.from('버퍼로 바꿀 문자열');
console.log('from(): ', buffer); // from():  <Buffer eb b2 84 ed 8d bc eb a1 9c 20 eb b0 94 ea bf 80 20 eb ac b8 ec 9e 90 ec 97 b4>
console.log('length: ', buffer.length); // length:  26
console.log('toString(): ', buffer.toString()); // toString():  버퍼로 바꿀 문자열

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffers = Buffer.concat(array);
console.log('concat(): ', buffers.toString()); // concat():  띄엄 띄엄 띄어쓰기

const emptyBuffer = Buffer.alloc(4);
console.log('alloc(): ', emptyBuffer) // alloc():  <Buffer 00 00 00 00>