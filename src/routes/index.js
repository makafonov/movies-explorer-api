const express = require('express');

const { signUp, signIn } = require('../controllers/user');
const { NotFoundError } = require('../errors');
const auth = require('../middlewares/auth');
const { signInValidator, signUpValidator } = require('../validators');

const { router: userRoutes } = require('./user');
const { router: movieRoutes } = require('./movie');

const router = express.Router();

router.post('/signin', signInValidator, signIn);
router.post('/signup', signUpValidator, signUp);

router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = { router };
