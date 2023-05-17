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
    const response = await request.post('/person?name=His+Dudeness');
    expect(response.status).toEqual(404);
  });

  test('Should send a 201 on a successful POST, creating one', async () => {
    const req = {
      name: 'Salad',
      type: 'Elven',
      flavors: 'Nature',
      canBeSpicy: false,
      hotOrCold: 'who cares',      
    };
    const response = await request.post('/food').send(req);
    expect(response.status).toEqual(201);
  });

  test('Should send a 200 on a successful GET, reading all', async () => {
    const response = await request.get('/food');
    expect(response.status).toEqual(200);
  });

  test('Should send a 200 on a successful GET, reading one', async () => {
    const response = await request.get('/food/2');
    expect(response.status).toEqual(200);
  });

  test('Should send a 200 on a successful DELETE', async () => {
    const response = await request.delete('/food/18');
    expect(response.status).toBe(200);
  });

  test('Should send a 200 on a successful PUT', async () => {
    const req = {
      name: 'Poutine',
      type: 'Canadian',
      flavors: 'Savory',
      canBeSpicy: false,
      hotOrCold: 'hot',      
    };
    const response = await request.put('/food/17').send(req);
    expect(response.status).toBe(200);
  });

  test('Should send a 200 on a successful PATCH', async () => {
    const req = {
      name: 'Quesadilla',
      type: 'Mexican',
      flavors: 'Cheese',    
    };
    const response = await request.patch('/food/17').send(req);
    expect(response.status).toBe(200);
  });

});