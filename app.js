const express = require('express');

const app = express();

const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.send('welcome to my api.');
});

app.listen(port, () => {
  console.log('running on port: '+ port);
});