require('dotenv').config();
const rateLimit = require('express-rate-limit');

let PORT;
let SECRET_KEY;

if (process.env.NODE_ENV === 'production') {
  PORT = process.env.PORT;
  SECRET_KEY = process.env.SECRET_KEY;
} else {
  PORT = 3000;
  SECRET_KEY = '5up3r-57r0ng-53cr37';
}

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const DATABASE_URL = 'mongodb://localhost:27017/moviesdb';
const SALT_LENGTH = 10;
const JWT_EXPIRES_IN = '7d';

module.exports = {
  PORT,
  SECRET_KEY,
  DATABASE_URL,
  SALT_LENGTH,
  JWT_EXPIRES_IN,
  limiter,
};
