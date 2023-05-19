'use strict';

require('dotenv').config(); // allows us to read from the .env
const server = require('./src/server');
const { sequelize } = require('./src/models/cardModel');

sequelize.sync()
  .then(() => {
    server.start(process.env.port || 3001);
  })
  .catch(error => {
    console.error('SQL CONNECTION ERROR: ', error);
  });