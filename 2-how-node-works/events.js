const EventEmitter = require("events");
const http = require('http');

const myEmitter = new EventEmitter();

class Sales extends EventEmitter {
    constructor(){
        super();
    }
}

myEmitter.on('newSale', () =>{
    console.log("There was a new sale!");
});
myEmitter.on('newSale', () =>{
    console.log("Constumer name : Kavita");
});

myEmitter.on('newSale',stock => {
    console.log(`THere are now ${stock} items left in stock.`);
})
myEmitter.emit("newSale",10);

// __________________________________________________________________

const server = http.createServer();

server.on ("request", (req,res) => {
    console.log("Request received");
    console.log(req.url);
    res.end("Request received");
});
server.on ("request", (req,res) => {
    console.log("Another request received");
    // res.end("Another request received");
});

server.on("close", () => {
    console.log("Server closed");
});

server.listen(8000,"127.0.0.1", () => {
    console.log("Waiting for requests...");
});