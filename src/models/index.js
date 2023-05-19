'use strict';
// require('dotenv').config();

const { Sequelize } = require('sequelize');

// require sequelize ORM (object-relational mapper)
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

// const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./collection');

// const cardSchema = require('./cardModel');
// const cardSchema = require('./cardModel');


// get SQL connection string
// const DATABASE_URL = process.env.DATABASE_URL || "sqlite:memory:";

// require data models for related tables
const team = require('./teamModel');
const teammate = require('./teammateModel');

// require Collection which can handle CRUD operations for any model/schema for our SQL database

// instantiates a sequelize ORM (object-relational mapper)
const sequelize = new Sequelize(DATABASE_URL);

// pass instantiated sequelize ORM to the db models so that sequelize knows how to define each model/table
const teamModel = team(sequelize);
const teammateModel = teammate(sequelize);
// const cardModel = cardSchema(sequelize, DataTypes);
// const cardCollection = new Collection(cardSchema);


// each entry within the team database has multiple relationships with the teammates table - in other words, one team can have multiple teammates and we identify these relationships by matching the "teamId" of a teammate to the "id" of a team.
teamModel.hasMany(teammateModel, {foreignKey: 'teamId', sourceKey: 'id'});

// reaffirms that one-to-many relationship between the team and the teammate tables. Defines the foreign key on the teammate data model as "teamId" which references the "id" field of the team table
teammateModel.belongsTo(teamModel, {foreignKey: 'teamId', targetKey: 'id'});

module.exports = {
  // exports the instantiated sequelize ORM
  // cardModel,
  sequelize,
  // cardModel: cardCollection,
  // sequelize,
  // exports an instantiated Collection object that references the teamModel
  Team: new Collection(teamModel),
  // exports an instantiated Collection object that references the teammateModel
  Teammate: new Collection(teammateModel),
};
