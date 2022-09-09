const rateLimit = require('express-rate-limit');

let PORT;
let SECRET_KEY;
let DB_NAME;

if (process.env.NODE_ENV === 'production') {
  PORT = process.env.PORT;
  SECRET_KEY = process.env.SECRET_KEY;
  DB_NAME = process.env.DB_NAME;
} else {
  PORT = 3000;
  SECRET_KEY = '5up3r-57r0ng-53cr37';
  DB_NAME = 'moviesdb';
}

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const DATABASE_URL = `mongodb://localhost:27017/${DB_NAME}`;
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
