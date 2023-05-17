'use strict';

const logger = (request, response, next) => {
  // was not sure how to properly test this without attaching the logger message on to the response object
  // previously was only using `console.log(`Request: ${request.method} | URL: ${request.url}`)`
  response.message = `Request: ${request.method} | URL: ${request.url}`;
  console.log(response.message);
  next();
};

module.exports = logger;