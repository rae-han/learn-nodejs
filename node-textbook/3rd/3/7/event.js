const EventEmitter = require('events');

const myEvent = new EventEmitter();

const EVENT_1 = 'event/1';
const EVENT_2 = 'event/2';
const EVENT_3 = 'event/3';
const EVENT_4 = 'event/4';
const EVENT_5 = 'event/5';

myEvent.addListener(EVENT_1, () => console.log(EVENT_1));
myEvent.on(EVENT_2, () => console.log(EVENT_2, 1));
myEvent.on(EVENT_2, () => console.log(EVENT_2, 2));
myEvent.once(EVENT_3, () => console.log(EVENT_3));
myEvent.on(EVENT_4, () => console.log(EVENT_4));
const listner = () => console.log(EVENT_5);
myEvent.on(EVENT_5, listner);

myEvent.emit(EVENT_1);
myEvent.emit(EVENT_2);
myEvent.emit(EVENT_3);
myEvent.emit(EVENT_3); // 실행 안 됨

myEvent.removeAllListeners(EVENT_4)
myEvent.removeAllListeners(EVENT_5);

myEvent.emit(EVENT_4); // 실행 안 됨
myEvent.emit(EVENT_5); // 실행 안 됨

console.log(myEvent.listenerCount(EVENT_2));
