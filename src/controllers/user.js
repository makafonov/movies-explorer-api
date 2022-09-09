const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_EXPIRES_IN, SALT_LENGTH, SECRET_KEY } = require('../config');
const { handleUserError } = require('../errors');
const { HTTP_CREATED, HTTP_OK } = require('../constants');

const signUp = (req, res, next) =>
  bcrypt
    .hash(req.body.password, SALT_LENGTH)
    .then((hash) =>
      User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
      })
    )
    .then((user) => res.status(HTTP_CREATED).send({ ...user.toObject(), password: undefined }))
    .catch((err) => handleUserError(err, next));

const signIn = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, SECRET_KEY, {
          expiresIn: JWT_EXPIRES_IN,
        }),
      });
    })
    .catch(next);
};

const getCurrentUserInfo = (req, res, next) =>
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(HTTP_OK).send(user))
    .catch((err) => handleUserError(err, next));

const updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleUserError(err, next));
};

module.exports = { signUp, getCurrentUserInfo, updateUser, signIn };
