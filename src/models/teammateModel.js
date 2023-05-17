'use strict';

// requires 'DataTypes' from the sequelize ORM (object-relationship mapper) package
const { DataTypes } = require('sequelize');

// sequelize.define(modelName, attributes, options)
// instantiated sequelize ORM will be passed in from the barrel file (./index.js)
const Teammate = (sequelize) => sequelize.define('Teammate', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teamId:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Teammate;