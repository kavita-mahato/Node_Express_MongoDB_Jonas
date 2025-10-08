const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 5;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
    console.log("I/O finished!");
    console.log("----------------");
    setTimeout(() => console.log("Timer 2 finished"), 0);
    setTimeout(() => console.log("Timer 3 finished"), 3000);
    setImmediate(() => console.log("Immediate 2 finished"));
    // Order of execution from inside an I/O callback:
    // 1. process.nextTick (microtask queue - runs immediately after current stack)
    // 2. setImmediate (check phase - same loop iteration as I/O)
    // 3. setTimeout(0) (timers phase - must wait for next loop iteration)
    // This is why Immediate 2 always runs before Timer 2 when scheduled from I/O

    process.nextTick(() => console.log("process.nextTick"));

    // Asynchronous
    // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    //     console.log(Date.now() - start, 'Password encrypted');
    // });
    // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    //     console.log(Date.now() - start, 'Password encrypted');
    // });
    // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    //     console.log(Date.now() - start, 'Password encrypted');
    // });
    // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    //     console.log(Date.now() - start, 'Password encrypted');
    // });
    // crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    //     console.log(Date.now() - start, 'Password encrypted');
    // });

    // Synchronous
    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password encrypted');

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password encrypted');

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password encrypted');

    crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
    console.log(Date.now() - start, 'Password encrypted');

});

console.log("Hello from top level code");
