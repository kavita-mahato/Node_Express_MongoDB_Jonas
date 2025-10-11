const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log('DB connection succesful!');
})

// Tour Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour must have a name'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'A Tour must have a price']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});

// Tour Model
const Tour = mongoose.model('Tour', tourSchema);

// ----------------------------------------------- STARTING THE SERVER -----------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
