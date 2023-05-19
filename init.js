// Use strict mode to avoid common JavaScript pitfalls
'use strict';
// const { sequelize } = require('./src/models/index');
// Import the sequelize instance and Food model from foodModel.js
// const { Cards } = require('./src/models/cards/cardModel');
const { sequelize, Cards } = require('./src/models/cardModel');

// const { Clothes } = require('./src/models/clothes/clothesModel');

// Import the sequelize instance, Team and Teammate models from index.js
const { sequelize : sequelize2, Team, Teammate } = require('./src/models/index');

// Declare a variable to store the ID of the team we're going to seed
let teamSeedId;

// Sync the sequelize instance with the Team and Teammate models
sequelize2
  .sync()
  .then(async () => {
    // Create a new team and store it in the database
    let teamSeed = await Team.create({
      name: 'reedvogt',
      mascot: 'Alpha',
      size: 6,
    });

    // Store the ID of the newly created team
    teamSeedId = teamSeed.id;

    // Log that the team was successfully created
    console.log('Team Database seeded with ', teamSeed);
  })
  .then(async () => {
    // Create a new teammate and store it in the database
    let teammateSeed = await Teammate.create({
      name: 'reedvogt_user',
      role: 'reedvogt',
      teamId: teamSeedId,
    });

    // Log that the teammate was successfully created
    console.log('Teammate Database seeded with ', teammateSeed);
  })
  // Catch and log any errors that occurred during the above process
  .catch((error) => console.error(error));

// Sync the sequelize instance with the Food model
sequelize.sync()
  .then(async () => {
    let initialSeed = await Cards.create({
      name: 'BlueEyes',
      type: 'Dragon',
      level: 8,
      monster: true,
    });

    console.log('Card Database seeded with ', initialSeed);
  })
  // Catch and log any errors that occurred during the above process
  .catch((error) => console.error(error));
