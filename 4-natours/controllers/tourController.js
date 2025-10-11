const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'..', 'dev-data', 'data', 'tours-simple.json');

const checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  // val is the value of the id parameter in the url
  // .params is a property of the request object that contains all the parameters in the url
  // eslint-disable-next-line no-use-before-define
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      status: 'Failed!',
      message: 'Invalid ID',
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  // .body instead of .params because we are checking the body of the request
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Failed!',
      message: 'Missing name or price',
    });
  }
  next();
};

const tours = JSON.parse(
  fs.readFileSync(filePath),
);

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

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours.length; // id for the new tour
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newTour = { id: newId, ...req.body }; // allows to create a new object by merging two existing objects together

  tours.push(newTour);

  // saving the new tour to the file
  fs.writeFile(filePath, JSON.stringify(tours), 'utf-8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({
        status: 'Fail',
        message: 'Could not save the new tour. Please try again.',
      });
    }
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  });
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  checkID,
  checkBody,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
