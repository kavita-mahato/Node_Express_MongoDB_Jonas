const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(filePath),
// );

const getAllTours = (req, res) => {
  console.log(req.requestTime); // to log the time of the request
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

const getTour = (req, res) => {
  console.log(req.params); // to get the id from the url

  const id = req.params.id * 1; // converting string to number
  // const tour = tours.find((el) => el.id === id); // finding the tour with the given id

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

const createTour = async (req, res) => {
  try{
    // const newTour = new Tour({})
  // newTour.save()

  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      tour: newTour,
    },
  });
  } catch(err){
    res.status(400).json({
      status: 'failed',
      message: "INVALID data sent!",
    })
  }
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
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
