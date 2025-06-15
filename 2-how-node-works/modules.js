// console.log(arguments);
// console.log(require("module").wrapper);

//module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(2,5));

//exports
// const calc2 = require("./test-module-2");
// console.log(calc2.add(2,7));
const {acc, multiply,divide} = require("./test-module-2");
console.log(multiply(2,4));

//Caching
require("./test-module-3")();