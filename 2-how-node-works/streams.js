const fs = require("fs");

const server = require("http").createServer();

server.on("request", (req, res) => {
    // Solution 1 - Read & Write file
    // In this solution the entire file is read into the memory and then sent to the client
    // fs.readFile("test-file.txt", "utf-8", (err, data) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     res.end(data);
    // });

     // Solution 2 - Streams
     // In this solution the file is read in chunks and then sent to the client
     // and does not read the entire file into memory
     /*
     const readable = fs.createReadStream("./test-file.txt"); // creating a readable stream

     // starting the readable stream
     readable.on("data", (chunk) => {
          // Start reading "data" in "chunks"
          res.write(chunk); // then write the chunk to the response
     });

    // Ending the response when the stream ends
    readable.on("end", () => {
        res.end();
    });

    // Handling error
    readable.on("error", (err) => {
        console.log(err);
        res.statusCode = 500;
        res.end("File not found!");
    }); */

    // Solution 3 - Piping (best solution)
    // Piping is a method that connects a readable stream to a writable stream
    const readable = fs.createReadStream("./test-file.txt");
    readable.pipe(res); // piping the readable stream to the response
    // readableSource.pipe(writableDestination);
});

server.listen(8000, "127.0.0.1", () => {
    console.log("listening to server at port 8000...");
});
