const fs = require("fs");
const http = require("http");
const url = require("url");

//3rd party modulus
const replaceTemplate = require('slugify')
const { default: slugify } = require("slugify");

//own modules
// const replaceTemplate = require('./modules/replacetemplate');

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado : ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// Non-blocking Asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if(err) return console.log('ERROR!🎇');

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written 😊");
//       });
//     });
//   });
// });
// console.log("Will read file!");

// ______________________________________________________________________________________________
// SERVER


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}));
console.log(slugs);

// console.log(slugify('fresh Avacados', {lower:true}));

const server = http.createServer((req, res) => {
  // console.log(req.url);
  const {query, pathname} = url.parse(req.url, true);
  // const pathname = req.url;

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    // console.log(cardsHtml);
    const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
    res.end(output);
  }
  // product page
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct,product);
    res.end(output);
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  //not found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>PAGE not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
