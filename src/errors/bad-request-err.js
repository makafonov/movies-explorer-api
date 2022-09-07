const { HTTP_ERROR } = require('../constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_ERROR;
  }
}

module.exports = BadRequestError;
