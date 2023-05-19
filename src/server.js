'use strict';

// Dependencies
const express = require('express');
const cors = require('cors');

// Middleware
const logger = require('./middleware/logger');
// const validator = require('./middleware/validator');

// Error Handlers
const handle404 = require('./error-handlers/handle404');
const handle500 = require('./error-handlers/handle500');

// Express app instance
const app = express();

// require router
const cardRouter = require('./routes/cardRouter');
// const clothesRouter = require('./routes/clothesRouter');
const teamRouter = require('./routes/teamRouter');
const teammateRouter = require('./routes/teammateRouter');

// uses these middlewares every time a request is made to the server
app.use(cors());
app.use(express.json());
app.use(logger);
// app.use(validator);

// uses router when any request is made to food route
app.use('/cards', cardRouter);
// app.use('/clothes', clothesRouter);
app.use('/team', teamRouter);
app.use('/teammate', teammateRouter);

app.use(handle404);
app.use(handle500);

app.get('/', (request, response) => {
  console.log('app gotten!');
  response.status(200).send('Hello World!');
});

module.exports = {
  app,
  start: (port) => app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
  }),
};