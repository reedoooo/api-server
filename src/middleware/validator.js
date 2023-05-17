'use strict';

const validator = (request, response, next) => {
  if (request.query.name) {
    next();
  }
  else {
    throw new Error('Missing \'name\' query');
  }
};

module.exports = validator;