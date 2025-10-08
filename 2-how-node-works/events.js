const EventEmitter = require("events");
const http = require("http");

// const myEmitter = new EventEmitter();

// Creating a class to extend the event emitter
class Sales extends EventEmitter {
    constructor() {
        super();
    }
}

const myEmitter = new Sales();

// Listening to event Emitter
myEmitter.on("newSale", () => {
    console.log("There was a new Sale");
});

myEmitter.on("newSale", () => {
    console.log("Customer name: Kavita");
});

myEmitter.on("newSale", (stock) => {
    console.log(`There are now ${stock} items left in the stock.`);
});

// Creating a event Emitter
myEmitter.emit("newSale", 9);

// ------------------------------------------------------------------------

const server = http.createServer();

// listening to the server (Event Emitter - "request")
server.on("request", (req, res) => {
    console.log("Request received——⨠⨠———⨠⨠———⨠⨠");
    console.log(req.url);
    res.end("Request received...");
});

server.on("request", (req, res) => {
    console.log("Another request received...");
});

// Event Emitter - "close"
server.on("close", () => {
    console.log("Server Closed!");
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Waiting for requests ...");
});
