'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

// our path to connect to SQL database
// const SQL_URL = process.env.SQL_URL || 'sqlite:memory:';

const SQL_URL = process.env.SQL_URL || 'sqlite:memory:';


// actually connects to the SQL database
const sequelize = new Sequelize(SQL_URL);

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
    type: DataTypes.STRING,
    allowNull: false,
  },
  monster: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});
console.log(Cards);
module.exports = {
  sequelize,
  Cards,
};