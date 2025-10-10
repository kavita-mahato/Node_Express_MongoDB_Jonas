const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

console.log(process.env.NODE_ENV);

// ----------------------------------------------- STARTING THE SERVER -----------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
