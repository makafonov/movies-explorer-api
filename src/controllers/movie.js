const { HTTP_CREATED } = require('../constants');
const { ForbiddenError, handleMovieError } = require('../errors');
const Movie = require('../models/movie');

const getUserMovies = (req, res, next) =>
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);

const createMovie = (req, res, next) =>
  Movie.create({ ...req.body, owner: req.user._id, movieId: req.body.id })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(HTTP_CREATED).send(movie))
    .catch((err) => handleMovieError(err, next));

const deleteMovie = (req, res, next) =>
  Movie.findById(req.params.movieId)
    .orFail()
    .populate('owner')
    .then((movie) => {
      if (movie.owner._id.toString() === req.user._id) {
        return movie
          .remove()
          .then((removedMovie) => res.send(removedMovie))
          .catch(next);
      }
      throw new ForbiddenError('Доступ запрещен');
    })
    .catch((err) => handleMovieError(err, next));

module.exports = { createMovie, deleteMovie, getUserMovies };
