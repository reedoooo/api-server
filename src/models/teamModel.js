'use strict';

// requires 'DataTypes' from the sequelize ORM (object-relationship mapper) package
const { DataTypes } = require('sequelize');

// sequelize.define(modelName, attributes, options)
// instantiated sequelize ORM will be passed in from the barrel file (./index.js)
const Team = (sequelize) => sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mascot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Team;