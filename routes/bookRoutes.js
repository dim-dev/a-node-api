const express = require('express');

const routes = (Book) => {
  const bookRouter = express.Router();
  bookRouter.route('/')
    .post((req, res) => {
      const book = new Book(req.body);
      book.save();
      res.status(201).send(book);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) { res.status(500).send(err); } else { res.json(books); }
      });
    });

  bookRouter.route('/:bookId')
    .get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) { res.status(500).send(err); } else { res.json(book); }
      });
    })
    .put((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        const currentBook = book;
        if (err) {
          res.status(500).send(err);
        } else {
          currentBook.title = req.body.title;
          currentBook.author = req.body.author;
          currentBook.genre = req.body.genre;
          currentBook.read = req.body.read;
          book.save();
          res.json(book);
        }
      });
    });
  return bookRouter;
};

module.exports = routes;
