const express = require('express');
const debug = require('debug');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');

const db = mongoose.connect('mongodb://localhost/book-api');

const app = express();
const port = process.env.port || 3000;

const bookRouter = express.Router();

bookRouter.route('/Books')
  .get((req, res) => {
    const query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) { res.status(500).send(err); } else { res.json(books); }
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my api.');
});

app.listen(port, () => {
  debug(`Gulp is running on port: ${port}`);
});
