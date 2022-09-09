const { HTTP_CONFLICT } = require('../constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CONFLICT;
  }
}

module.exports = ConflictError;
