const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// --------------------------------------------------- MIDDLEWARES ---------------------------------------------------
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

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;