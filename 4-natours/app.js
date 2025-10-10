const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// ------------------------------------------------ 1) MIDDLEWARES --------------------------------------------------
app.use(morgan('dev')); // using morgan middleware for logging

app.use(express.json()); // middleware to parse the incoming JSON data

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next(); // to pass the control to the next middleware
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // ISOString() method converts date to a string
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ----------------------------------------------- 2) ROUTE HANDLERS -------------------------------------------------
const getAllTours = (req, res) => {
  console.log(req.requestTime); // to log the time of the request
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  // if the id is not valid
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      status: 'Failed!',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// User Route Handlers
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
}
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
}
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
}
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
}
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
}

// --------------------------------------------- 3) ROUTES --------------------------------------------------

// Chaining the route handlers
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// ------------------------------------------ 4) STARTING THE SERVER -----------------------------------------------
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
