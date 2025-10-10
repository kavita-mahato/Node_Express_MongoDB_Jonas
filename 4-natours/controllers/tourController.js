const fs = require('fs');

const checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  if (req.params.id * 1 >= tours.length) {
    return res.status(404).json({
      status: 'Failed!',
      message: 'Invalid ID',
    });
  }
  next();
};

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
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
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};