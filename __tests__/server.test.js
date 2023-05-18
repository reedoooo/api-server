'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);

describe('Testing if server sends back proper responses & status codes', () => {

  // jest.setTimeout(20000);

  test('Should send a 404 on a bad route', async () => {
    const response = await request.get('/person');
    expect(response.status).toEqual(404);
  });

  test('Should send a 404 on a bad method', async () => {
    const response = await request.post('/person?name=Tha+Human');
    expect(response.status).toEqual(404);
  });

  test('Should send a 201 on a successful POST, creating one', async () => {
    const req = {
      name: 'name',
      type: 'type',
      level: 'level',
      monster: false,
    };
    const response = await request.post('/cards').send(req);
    expect(response.status).toEqual(201);
  });

  test('Should send a 200 on a successful GET, reading all', async () => {
    const response = await request.get('/cards');
    expect(response.status).toEqual(200);
  });

  test('Should send a 200 on a successful GET, reading one', async () => {
    const response = await request.get('/cards/2');
    expect(response.status).toEqual(200);
  });

  test('Should send a 200 on a successful DELETE', async () => {
    const response = await request.delete('/cards/18');
    expect(response.status).toBe(200);
  });

  test('Should send a 200 on a successful PUT', async () => {
    const req = {
      name: 'Salad',
      type: 'Elven',
      level: 'Nature',
      monster: false,   
    };
    const response = await request.put('/cards/17').send(req);
    expect(response.status).toBe(200);
  });

  test('Should send a 200 on a successful PATCH', async () => {
    const req = {
      name: 'Quesadilla',
      type: 'Mexican',
      level: 'Cheese',    
    };
    const response = await request.patch('/cards/17').send(req);
    expect(response.status).toBe(200);
  });

});