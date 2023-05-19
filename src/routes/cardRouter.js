'use strict';

const express = require('express');
const router = express.Router();
const { Cards } = require('../models/cardModel');

// CRUD Operations

// creates one Card entry and adds it to the SQL database
const printCard = async (request, response, next) => {
  const newCard = await Cards.create(request.body);
  response.status(201).json(newCard);
};

// returns all Card entries in the SQL database
const readAllCard = async (request, response, next) => {
  let cardData = await Cards.findAll();
  response.status(200).json(cardData);
};

// returns one Card entry in the SQL database
const readOneCard = async (request, response, next) => {
  let cardData = await Cards.findOne({where: {id: request.params.id}});
  response.status(200).json(cardData);
};

// finds one Card entry in the SQL database, and updates/changes the whole entry
const replaceCard = async (request, response, next) => {
  let cardData = await Cards.findOne({where: {id: request.params.id}});
  await cardData.update(request.body);
  response.status(200).json(cardData);
};

const updateCard = async (request, response, next) => {
  let cardData = await Cards.findOne({where: {id: request.params.id}});
  for (const key in cardData.dataValues) {
    // if key matches with a property on the request.body AND if the value of that property on the request.body is different than what is in the database - we update
    if (cardData[key] !== request.body[key] && request.body[key]) {
      await cardData.update({[key]: request.body[key]});
    }
  }
  response.status(200).json(cardData);
};

const deleteCard = async (request, response, next) => {
  let cardData = await Cards.findOne({where: {id: request.params.id}});
  if (cardData) {
    await cardData.destroy();
  }
  response.status(200).send('Entry successfully removed from Database');
};

// Routes
router.post('/', printCard);
router.get('/', readAllCard);
router.get('/:id', readOneCard);
router.put('/:id', replaceCard);
router.patch('/:id', updateCard);
router.delete('/:id', deleteCard);

module.exports = router;
