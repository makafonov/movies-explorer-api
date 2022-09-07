const { HTTP_NOT_FOUND } = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_NOT_FOUND;
  }
}

module.exports = NotFoundError;
