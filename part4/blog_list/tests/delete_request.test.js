const { describe, test, after} = require('node:test');
const assert = require('assert');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Blog = require('../models/blog');

const api = supertest(app);

describe('deleting a blog post', () => {

  test('returns with 404 if blog does not exist', async () => {
    const validNonexistingId = new mongoose.Types.ObjectId();
    await api
      .delete(`/api/blogs/${validNonexistingId}`)
      .expect(404);
  });

  test('returns with 400 if id is invalid', async () => {
    const invalidId = '123123123';
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400);
  });

  test('succeeds with 204 if id is valid and blog exists', async () => {
    const blog = new Blog({
      title: 'Test blog',
      author: 'Test Author',
      url: 'http://testurl.com'
    });
    const savedBlog = await blog.save();

    await api
      .delete(`/api/blogs/${savedBlog._id}`)
      .expect(204);

    const blogsAtEnd = await Blog.find({});
    assert.strictEqual(blogsAtEnd.length, 2);
  });

});

after(() => {
  return mongoose.connection.close();
});
