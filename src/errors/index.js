const { HTTP_SERVER_ERROR, DUPLICATE_KEY_ERROR } = require('../constants');

const UnauthorizedError = require('./unauthorized-err');
const ConflictError = require('./conflict-err');
const NotFoundError = require('./not-found-err');
const BadRequestError = require('./bad-request-err');
const ForbiddenError = require('./forbidden-err');

const handleError = (err, req, res, next) => {
  const { statusCode = HTTP_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === HTTP_SERVER_ERROR ? 'На сервере произошла ошибка' : message,
  });

  next();
};

const handleUserError = (err, next) => {
  if (err.name === 'MongoServerError' && err.code === DUPLICATE_KEY_ERROR) {
    next(new ConflictError('Пользователь с указанным email уже существует'));
  } else if (err.name === 'DocumentNotFoundError') {
    next(new NotFoundError('Пользователь не найден'));
  } else if (err.name === 'ValidationError') {
    next(new BadRequestError(`Некорректные данные пользователя: ${err.message}`));
  } else {
    next(err);
  }
};

const handleMovieError = (err, next) => {
  if (err.name === 'DocumentNotFoundError') {
    next(new NotFoundError('Фильм не найден'));
  } else if (err.name === 'ValidationError') {
    next(new BadRequestError(`Некорректные данные фильма: ${err.message}`));
  } else {
    next(err);
  }
};

module.exports = {
  UnauthorizedError,
  handleError,
  handleUserError,
  handleMovieError,
  ForbiddenError,
};
