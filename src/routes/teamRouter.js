'use strict';

const express = require('express');
const router = express.Router();

const { Team, Teammate } = require('../models/index');

// Routes
router.post('/', async (request, response, next) => {
  try {
    let newTeam = await Team.create(request.body);
    response.send(newTeam);
  } 
  catch (err) {
    console.error('ROUTER ERROR > Unable to CREATE new database entry ', err);
  }
});

router.get('/', async (request, response, next) => {
  try {
    let dbData = await Team.read();
    response.send(dbData);
  }
  catch (err) {
    console.error('ROUTER ERROR > Unable to READ ALL database entries ', err);
    response.send(err);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    let foundTeam = await Team.read(request.params.id, {
      include: Teammate.dbModel,
    });
    response.send(foundTeam);
  }
  catch (err) {
    console.error('ROUTER ERROR > Unable to READ single database entry ', err);
    response.send(err);
  }
});

router.put('/:id', async (request, response, next) => {
  try {
    let updatedTeam = await Team.update(request.params.id, request.body);
    response.send(updatedTeam);
  }
  catch (err) {
    console.error('ROUTER ERROR > Unable to UPDATE database entry ', err);
    response.send(err);
  }

});
// router.patch('/:id', updateCard)

router.delete('/:id', async (request, response, next) => {
  try {
    let isDeleted = await Team.delete(request.params.id);
    response.status(200).send(isDeleted);
  }
  catch (err) {
    console.error('ROUTER ERROR > Unable to DELETE database entry ', err);
    response.send(err);
  }
});

module.exports = router;