'use strict';

const express = require('express');
const router = express.Router();

const { Teammate, Team } = require('../models/index');

// Routes
router.post('/', async (request, response, next) => {
  try {
    let newTeammate = await Teammate.create(request.body);
    response.send(newTeammate);
  } 
  catch (err) {
    console.error('ROUTER ERROR > Unable to CREATE new database entry ', err);
  }
});

router.get('/', async (request, response, next) => {
  try {
    let dbData = await Teammate.read();
    response.send(dbData);
  }
  catch (err) {
    console.error('ROUTER ERROR > Unable to READ ALL database entries ', err);
    response.send(err);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    let foundTeammate = await Teammate.read(request.params.id, {
      include: Team.dbModel,
    });
    response.send(foundTeammate);
  }
  catch (err) {
    console.error('ROUTER ERROR > Unable to READ single database entry ', err);
    response.send(err);
  }
});

router.put('/:id', async (request, response, next) => {
  try {
    let updatedTeammate = await Teammate.update(request.params.id, request.body);
    response.send(updatedTeammate);
  }
  catch (err) {
    console.error('ROUTER ERROR > Unable to UPDATE database entry ', err);
    response.send(err);
  }

});
// router.patch('/:id', updateCard)

router.delete('/:id', async (request, response, next) => {
  try {
    let isDeleted = await Teammate.delete(request.params.id);
    response.status(200).send(isDeleted);
  }
  catch (err) {
    console.error('ROUTER ERROR > Unable to DELETE database entry ', err);
    response.send(err);
  }
});

module.exports = router;