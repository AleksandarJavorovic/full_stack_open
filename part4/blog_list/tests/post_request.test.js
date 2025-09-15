const { test, after, describe } = require('node:test');
const assert = require('node:assert')
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('HTTP POST', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "test blog post",
      author: "Alex Alex",
      url: "http://example.com/test-blog-post",
      likes: 50
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const titles = response.body.map(r => r.title);

    assert.strictEqual(response.body.length, 5);
    assert.ok(titles.includes("test blog post"));
  });
});


after(() => {
  return mongoose.connection.close();
});
