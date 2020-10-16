require('express-async-errors')
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')
const authController = require('./authController')
const eventController = require('./eventController')

const app = express()

/**
 * Middlewares
 */
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json({ strict: false }))
app.use((req, res, next) => {
  console.log(`${req.method} -> ${req.url}`)

  // default cache for all requests
  res.set('Cache-Control', 'public,max-age=30')

  return next()
})

/**
 * @see https://sa-east-1.console.aws.amazon.com/dynamodb/home?region=sa-east-1#tables:selected=ChurrasPlanner;tab=items
 * @see https://console.aws.amazon.com/iam/home?#/users/churras-planner
 * @logs https://sa-east-1.console.aws.amazon.com/cloudwatch/home?region=sa-east-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Fchurras-planner-prod-app
 */
app.post('/login', authController.handleLogin)
app.use('*', authController.middlewareAuth)
app.get('/events', eventController.handleGetEvents)
app.post('/events', eventController.handleCreateEvent)
app.use('/events/:eventId*', eventController.middlewareGetEvent)
app.get('/events/:eventId', eventController.handleGetEvent)
app.put('/events/:eventId', eventController.handleUpdateEvent)

app.get('*', (req, res) => {
  return res.status(404).json({
    headers: req.headers,
    params: req.params,
    notFound: true,
    url: req.url,
    fullUrl: req.fullUrl
  })
})

module.exports.main = serverless(app)
