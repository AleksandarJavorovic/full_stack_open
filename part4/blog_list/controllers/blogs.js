const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', middleware.validateBlog, (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter
