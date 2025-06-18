// const express = require('express')
// const mongoose = require('mongoose')
// const logger = require('./utils/logger')
// const config = require('./utils/config')
// const blogsRouter = require('./controllers/blogs')

// const app = express()

// mongoose.connect(config.MONGODB_URI)

// app.use(express.json())

// app.use('/api/blogs', blogsRouter)

// app.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`)
// })
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}, visit: http://localhost:${config.PORT}/api/blogs`)
})