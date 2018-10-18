const express = require('express');
const debug = require('debug')('bookrouter');

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

  bookRouter.use('/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        res.status(500).send(err);
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found.');
      }
    });
  });
  bookRouter.route('/:bookId')
    .get((req, res) => {
      res.json(req.book);
    })
    .put((req, res) => {
      const requestBook = req.book;
      requestBook.title = req.body.title;
      requestBook.author = req.body.author;
      requestBook.genre = req.body.genre;
      requestBook.read = req.body.read;
      requestBook.save();
      res.json(requestBook);
    })
    .patch((req, res) => {
      const reqbody = req.body;
      debug(reqbody);
      if (reqbody.id) {
        delete reqbody.id;
      }
      Object.keys(reqbody).forEach((key) => {
        req.book[key] = reqbody[key];
      });
      req.book.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
    });
  return bookRouter;
};

module.exports = routes;
