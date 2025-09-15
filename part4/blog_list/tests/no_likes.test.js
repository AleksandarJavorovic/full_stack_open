const { test, after, describe } = require('node:test');
const assert = require('node:assert')
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('blog without likes', () => {
  test('defaults to 0 likes', async () => {
    const newBlog = {
      title: "blog without likes",
      author: "Likes Like",
      url: "http://example.com/no-likes"
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const addedBlog = response.body.find(b => b.title === "blog without likes");

    assert.strictEqual(addedBlog.likes, 0);
  });
});


after(() => {
  return mongoose.connection.close();
});
