const fs = require("fs");

const server = require("http").createServer();

server.on("request", (req, res) => {
    // Solution 1 - Read & Write file
    // In this solution the entire file is read into the memory and then sent to the client
    fs.readFile("test-file.txt", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        }
        res.end(data);
    });

});

server.listen(8000, "127.0.0.1", () => {
    console.log("listening to server at port 8000 ...");
});
