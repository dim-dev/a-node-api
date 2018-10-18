const Book = require('../models/bookModel');

const bookctrl = {
  post: (req, res) => {
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      res.send('title is required.');
    }
    book.save();
    res.status(201);
    res.send(book);
  },
  get: (req, res) => {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) { res.status(500).send(err); } else { res.json(books); }
    });
  },
};

module.exports = bookctrl;
