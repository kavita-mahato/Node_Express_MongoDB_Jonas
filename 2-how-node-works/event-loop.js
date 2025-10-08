const fs = require('fs');

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
    console.log('I/O finished!');
});

console.log('Hello from top level code');