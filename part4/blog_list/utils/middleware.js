const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const validateBlog = (request, response, next) => {
  const { title, url } = request.body;
  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }
  next();
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  validateBlog
}