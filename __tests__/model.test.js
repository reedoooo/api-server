'use strict';

const { sequelize, Team, Teammate } = require('../src/models/indextest.js');

beforeAll(async() => {
  await sequelize.sync();
});

afterAll(async() => {
  await sequelize.drop();
});

let teamId;
let teammateId;

describe('test Team data model & CRUD Operations inherited from Collection class', () => {

  test('Able to create a new Team', async () => {
    let newTeam = await Team.create({
      name: 'Super Mega Cool Squad',
      mascot: 'Super Mega Dragon Mammoth',
      size: 100,
    });

    expect(newTeam.name).toEqual('Super Mega Cool Squad');
    expect(newTeam.mascot).toEqual('Super Mega Dragon Mammoth');
    expect(newTeam.size).toEqual(100);
    expect(newTeam.id).toBeTruthy();
  });

  test('Able to create a new Teammate', async () => {
    let newTeammate = await Teammate.create({
      name: 'Tha Human',
      role: 'Tha Humanest',
      teamId: 1,
    });

    expect(newTeammate.name).toEqual('Tha Human');
    expect(newTeammate.role).toEqual('Tha Humanest');
    expect(newTeammate.teamId).toEqual(1);
    expect(newTeammate.id).toBeTruthy();
  });

  test('Able to read all Team entries', async () => {
    let allTeams = await Team.read();

    expect(allTeams.length).toBeTruthy();
  });

  test('Able to read all Teammate entries', async () => {
    let allTeammates = await Teammate.read();

    expect(allTeammates.length).toBeTruthy();
  });

  test('Able to read one specific entry from Team and the associated Teammates', async () => {
    let foundTeam = await Team.read(1, {include: Teammate.dbModel});

    expect(foundTeam.name).toBeTruthy();
    expect(foundTeam.mascot).toBeTruthy();
    expect(foundTeam.size).toBeTruthy();
    expect(foundTeam.id).toBeTruthy();
    expect(foundTeam.Teammates[0].name).toEqual('Tha Human');

  });

  test('Able to read one specific entry from Teammate and the associated Team', async () => {
    let foundTeammate = await Teammate.read(1, {include: Team.dbModel});

    expect(foundTeammate.name).toBeTruthy();
    expect(foundTeammate.role).toBeTruthy();
    expect(foundTeammate.teamId).toBeTruthy();
    expect(foundTeammate.id).toBeTruthy();
    expect(foundTeammate.Team.dataValues.name).toEqual('Super Mega Cool Squad');

  });

  test('Able to update one specific entry from Team', async () => {
    await Team.update(1, {
      name: 'Super Awesome Mega Team Go Force Extreme',
      mascot: 'Phil',
      size: 3,
    });

    let updatedTeam = await Team.read(1);

    expect(updatedTeam.name).toEqual('Super Awesome Mega Team Go Force Extreme');
    expect(updatedTeam.mascot).toEqual('Phil');
    expect(updatedTeam.size).toEqual(3);
  });

  test('Able to update one specific entry from Teammate', async () => {
    await Teammate.update(1, {
      name: 'Super Dude',
      role: 'HR Rep',
      teamId: 1,
    });

    let updatedTeammate = await Teammate.read(1);

    expect(updatedTeammate.name).toEqual('Super Dude');
    expect(updatedTeammate.role).toEqual('HR Rep');
    expect(updatedTeammate.teamId).toEqual(1);
  });

  test('Able to delete a Teammate', async () => {
    let isDeleted = await Teammate.delete(1);

    expect(isDeleted).toEqual('Entry successfully deleted');
  });

  test('Able to delete a Team', async () => {
    let isDeleted = await Team.delete(1);

    expect(isDeleted).toEqual('Entry successfully deleted');
  });


});
