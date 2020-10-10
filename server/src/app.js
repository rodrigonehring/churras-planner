require('express-async-errors')
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')
const dynamodb = require('./dynamodb')
const app = express()

const TableName = 'ChurrasPlanner'

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
 */

// inject req.user using authorizer headers
// in a perfect world, this header should be a temporary token
async function middlewareAuth(req, res, next) {
  const { Item } = await dynamodb
    .get({
      TableName,
      Key: { hashkey: req.headers.authorization, sortkey: 'user' }
    })
    .promise()

  if (!Item) {
    return res.status(401).json({ message: 'Fake expired' })
  }
  req.user = Item

  next()
}

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  const { Item } = await dynamodb
    .get({
      TableName,
      Key: { hashkey: username, sortkey: 'user' }
    })
    .promise()

  if (!Item) {
    return res.status(401).json({ message: 'User not found.' })
  }

  // @todo: a little better validation with encrypted password
  if (Item.password !== password) {
    return res.status(401).json({ message: 'Incorrect password.' })
  }

  delete Item.password

  return res.json({ user: Item })
})

async function handleGetEvents(req, res) {
  const query = {
    TableName,
    KeyConditionExpression: 'hashkey = :hashkey and begins_with(sortkey, :begins)',
    ExpressionAttributeValues: { ':hashkey': req.user.hashkey, ':begins': 'event-' }
  }

  const { Items } = await dynamodb.query(query).promise()

  return res.json({ events: Items, user: req.user })
}

async function handleCreateEvent(req, res) {
  const { date, title, description, obs } = req.body

  const Item = {
    hashkey: req.user.hashkey,
    sortkey: `event-${date}-main`,
    title,
    description,
    obs,
    date
  }

  await dynamodb
    .put({
      TableName,
      Item
    })
    .promise()

  return res.json(Item)
}

async function middlewareGetEvent(req, res, next) {
  const { Item } = await dynamodb
    .get({ TableName, Key: { hashkey: req.user.hashkey, sortkey: req.params.eventId } })
    .promise()

  if (!Item) {
    return res.status(404).json({ message: 'Event not found.' })
  }

  req.event = Item
  next()
}

async function handleAddGuest(req, res) {
  const { name, drink } = req.body
  const uuid = Date.now()

  const Item = {
    hashkey: req.event.hashkey,
    sortkey: `guest-${req.event.date}-${uuid}`,
    name,
    drink
  }

  return res.json({ Item, event: req.event })
}

app.use('*', middlewareAuth)
app.get('/events', handleGetEvents)
app.post('/events', handleCreateEvent)
app.use('/events/:eventId*', middlewareGetEvent)
app.post('/events/:eventId/guests', handleAddGuest)

app.get('*', (req, res) => {
  // res.status(404).render('404')
  return res.json({
    headers: req.headers,
    params: req.params,
    notFound: true,
    url: req.url,
    fullUrl: req.fullUrl
  })
})

module.exports.main = serverless(app)
