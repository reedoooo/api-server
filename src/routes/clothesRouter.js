'use strict';

const express = require('express');
const router = express.Router();
const { Clothes } = require('../models/clothesModel');

// CRUD Operations

// creates one Clothes entry and adds it to the SQL database
const printClothes = async (request, response, next) => {
  const newClothes = await Clothes.create(request.body);
  response.status(201).json(newClothes);
};

// returns all Clothes entries in the SQL database
const readAllClothes = async (request, response, next) => {
  let clothesData = await Clothes.findAll();
  response.status(200).json(clothesData);
};

// returns one Clothes entry in the SQL database
const readOneClothes = async (request, response, next) => {
  let clothesData = await Clothes.findOne({where: {id: request.params.id}});
  response.status(200).json(clothesData);
};

// finds one Clothes entry in the SQL database, and updates/changes the whole entry
const replaceClothes = async (request, response, next) => {
  let clothesData = await Clothes.findOne({where: {id: request.params.id}});
  await clothesData.update(request.body);
  response.status(200).json(clothesData);
};

const updateClothes = async (request, response, next) => {
  let clothesData = await Clothes.findOne({where: {id: request.params.id}});
  for (const key in clothesData.dataValues) {
    // if key matches with a property on the request.body AND if the value of that property on the request.body is different than what is in the database - we update
    if (clothesData[key] !== request.body[key] && request.body[key]) {
      await clothesData.update({[key]: request.body[key]});
    }
  }
  response.status(200).json(clothesData);
};

const deleteClothes = async (request, response, next) => {
  let clothesData = await Clothes.findOne({where: {id: request.params.id}});
  if (clothesData) {
    await clothesData.destroy();
  }
  response.status(200).send('Entry successfully removed from Database');
};

// Routes
router.post('/', printClothes);
router.get('/', readAllClothes);
router.get('/:id', readOneClothes);
router.put('/:id', replaceClothes);
router.patch('/:id', updateClothes);
router.delete('/:id', deleteClothes);

module.exports = router;
