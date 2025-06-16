const fs = require('fs');
const express = require('express');

const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'NATOURS' });
// });

// app.post("/", (req, res) => {
//     res.send("You can post to this endpoint...");
// });

//if cons x = JSON.parse
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status:"success",
    result: tours.length,
    data: {
      // then tours : x 
      tours
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
