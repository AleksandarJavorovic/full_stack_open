const { test, after, describe } = require('node:test');
const assert = require('node:assert')
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('blog ID', () => {
  test('blog unique identifier property is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogs = response.body;
    blogs.forEach(blog => {
      assert.ok(blog.id);
      assert.strictEqual(blog._id, undefined);
    });
  });
});


after(() => {
  return mongoose.connection.close();
});
