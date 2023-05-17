// Use strict mode to avoid common JavaScript pitfalls
'use strict';

// Import the sequelize instance and Food model from foodModel.js
const { sequelize, Cards } = require('./src/models/cardModel');

// Import the sequelize instance, Team and Teammate models from index.js
const { sequelize: sequelize2, Team, Teammate } = require('./src/models/index');

// Declare a variable to store the ID of the team we're going to seed
let teamSeedId;

// Sync the sequelize instance with the Team and Teammate models
sequelize2
  .sync()
  .then(async () => {
    // Create a new team and store it in the database
    let teamSeed = await Team.create({
      name: 'YuGiOh',
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
      name: 'Sasuke',
      role: 'Sole Survivor of the Uchiha Clan',
      teamId: teamSeedId,
    });

    // Log that the teammate was successfully created
    console.log('Teammate Database seeded with ', teammateSeed);
  })
  // Catch and log any errors that occurred during the above process
  .catch((error) => console.error(error));

// Sync the sequelize instance with the Food model
sequelize
  .sync()
  .then(async () => {
    // Create a new food item and store it in the database
    let initialSeed = await Card.create({
      name: 'BlueEyes',
      type: 'Dragon',
      level: 8,
      monster: true,
    });

    // Log that the food item was successfully created
    console.log('Card Database seeded with ', initialSeed);
  })
  // Catch and log any errors that occurred during the above process
  .catch((error) => console.error(error));
