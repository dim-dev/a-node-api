const express = require('express');
const debug = require('debug')('appjs:');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const db = mongoose.connect('mongodb://localhost:27017/book-api', { useNewUrlParser: true });

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.listen(port, () => {
  debug(`express running on port: ${port}`);
});
