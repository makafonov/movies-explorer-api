const router = require('express').Router();

const { createMovie, deleteMovie, getUserMovies } = require('../controllers/movie');
const { movieCreateValidator, movieDeleteValidator } = require('../validators');

router.get('', getUserMovies);
router.post('', movieCreateValidator, createMovie);
router.delete('/:_id', movieDeleteValidator, deleteMovie);

module.exports = { router };
