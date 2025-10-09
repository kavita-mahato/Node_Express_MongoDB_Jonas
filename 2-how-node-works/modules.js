// console.log(arguments);
// console.log(require("module").wrapper);

const C = require("./test-module-1");
const calc1 = new C(); // Creating an object of the class Calculator
console.log(calc1.add(2, 5));

// Exports
// const calc2 = require("./test-module-2");
const {add, multiply} = require("./test-module-2");
// console.log(calc2.add(2, 5));
console.log(add(2, 5));
console.log(multiply(2, 5));

// Caching
require("./test-module-3")(); // Immediately invoking the function exported from the module
require("./test-module-3")();
require("./test-module-3")();