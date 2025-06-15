const fs = require('fs');
const server = require('http').createServer();

server.on("request", (req, res) => {

    // Soltion 1
    // fs.readFile("test-file.txt", (err, data) => {
    //     if(err) console.log(err);
    //     res.end(data);
    // });

    //Soltion 2
    // const readable = fs.createReadStream('testtt-file.txt')
    // readable.on("data", chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end', () => {
    //     res.end();
    // });
    // readable.on("error", err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("file not found");
    // })

    // Solution 3
    const readable = fs.createReadStream('test-file.txt')
    readable.pipe(res);
    //resadaableSource.pipe(writeable)

});
server.listen(8000,"127.0.0.1", () => {
    console.log("Listening...");
});