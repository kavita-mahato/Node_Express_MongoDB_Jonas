const mongoose = require('mongoose');

// Tour Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour must have a name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A Tour must have a price'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

// Tour Model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;