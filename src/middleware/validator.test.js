'use strict';

const validator = require('./validator');

describe('Testing if the validator middleware is working correctly', () => {

  test('Should show pass if request.query.name is valid', () => {
    const request = {
      method: 'GET',
      url: '/cards',
      query: {
        name: 'BlueEyes',
      },
    };
    const response = {};
    const next = jest.fn();
  
    validator(request, response, next);
    // if next is called, then the request was valid
    expect(next).toHaveBeenCalled();
  });

  test('Should throw an error if request.query.name is missing/falsy', () => {
    const request = {
      method: 'GET',
      url: '/cards',
      query: {
        naem: 'BlueEyes',
      },
    };
    const response = {};
    const next = jest.fn();

    expect(() => validator(request, response, next)).toThrow(Error);
  });

});