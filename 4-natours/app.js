const fs = require('fs');
const express = require('express');

const app = express();

// app.get('/', (req, res) => {
//   res.status(200).json({
//     app: 'Natours',
//     message: 'Hello from the Server side!',
//   });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

//-------------------------------------------------------------------------------------------

app.use(express.json()); // middleware to parse the incoming JSON data

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// handling get request
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params); // to get the id from the url

  const id = req.params.id * 1; // converting string to number
  const tour = tours.find((el) => el.id === id); // finding the tour with the given id

  // check if the id is valid
  if (!tour) {
    return res.status(404).json({
      status: 'Failed!',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// handling post request
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours.length; // id for the new tour
  const newTour = Object.assign({ id: newId }, req.body); // allows to create a new object by merging two existing objects together

  tours.push(newTour);

  // saving the new tour to the file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// handling patch request
app.patch('/api/v1/tours/:id', (req, res) => {

    // if the id is not valid
    if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      status: 'Failed!',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
