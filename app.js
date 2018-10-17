const express = require('express');
const debug = require('debug')('appjs:');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');

const db = mongoose.connect('mongodb://localhost:27017/book-api', { useNewUrlParser: true });

const app = express();
const port = process.env.port || 3000;

const bookRouter = express.Router();

bookRouter.route('/Books')
  .get((req, res) => {
    const query = {};
    debug(req.query.genre);
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) { res.status(500).send(err); } else { res.json(books); }
    });
  });

bookRouter.route('/Books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) { res.status(500).send(err); } else { res.json(book); }
    });
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my api.');
});

app.listen(port, () => {
  debug(`Gulp is running on port: ${port}`);
});
