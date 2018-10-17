const mongoose = require('mongoose');

const mongooseSchema = mongoose.Schema;
const Schema = mongooseSchema;

const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model('Book', bookModel);
