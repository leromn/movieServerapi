const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  budget: Number,
  releaseDate: Date,
  revenue: Number,
  status: String,
  runtime: Number,
  vote_average: Number,
  genre: [String],
  language: String,
  cast: [String],
  comments: [{ body: String, date: Date, rate: Number }],
});

movieSchema.index({ name: 'text' });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  movies: [String],
});
personSchema.index({ name: 'text' });

const Movie = mongoose.model('Movie', movieSchema);
const Person = mongoose.model('Person', personSchema);

module.exports.Movie = Movie;
module.exports.Person = Person;
