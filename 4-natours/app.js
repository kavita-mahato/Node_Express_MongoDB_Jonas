const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    app: 'Natours',
    message: 'Hello from the Server side!',
  });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
