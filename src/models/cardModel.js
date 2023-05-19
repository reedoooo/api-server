'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// our path to connect to SQL database
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

// actually connects to the SQL database
const sequelize = new Sequelize(DATABASE_URL);

// defines table and all of its columns (each property on the defined object is a column in the SQL table)
const Cards = sequelize.define('Cards', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  monster: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = {
  sequelize,
  Cards,
};
