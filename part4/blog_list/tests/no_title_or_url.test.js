const { test, after, describe } = require('node:test');
const assert = require('node:assert')
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('blog without title or url', () => {
  test('responds with 400 Bad Request', async () => {
    const newBlog = {};

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });

});

after(() => {
  return mongoose.connection.close();
});
