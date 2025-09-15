const { test, after, describe } = require('node:test');
const assert = require('node:assert')
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('HTTP GET', () => {
  test('all blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, 4);
  });
});


after(() => {
  return mongoose.connection.close();
});
