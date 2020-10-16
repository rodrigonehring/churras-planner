const dynamodb = require('./dynamodb')
const TableName = 'ChurrasPlanner'

async function handleGetEvents(req, res) {
  const query = {
    TableName,
    KeyConditionExpression: 'hashkey = :hashkey and begins_with(sortkey, :begins)',
    ExpressionAttributeValues: { ':hashkey': req.user.hashkey, ':begins': 'event-' }
  }

  const { Items } = await dynamodb.query(query).promise()

  return res.json({ events: Items })
}

async function handleCreateEvent(req, res) {
  const { date, title, description, suggestedPayment, suggestedPaymentDrink } = req.body

  const Item = {
    hashkey: req.user.hashkey,
    sortkey: `event-${date}-main`,
    title,
    description,
    guests: [],
    suggestedPayment,
    suggestedPaymentDrink,
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

async function getEvent(hashkey, sortkey) {
  const { Item } = await dynamodb.get({ TableName, Key: { hashkey, sortkey } }).promise()

  return Item
}

async function middlewareGetEvent(req, res, next) {
  const event = await getEvent(req.user.hashkey, req.params.eventId)

  if (!event) {
    return res.status(404).json({ message: 'Event not found.' })
  }

  req.event = event
  next()
}

// return event
async function handleGetEvent(req, res) {
  return res.json({ event: req.event })
}

async function handleUpdateEvent(req, res) {
  await dynamodb
    .put({
      TableName,
      Item: req.body
    })
    .promise()

  const event = await getEvent(req.user.hashkey, req.params.eventId)

  return res.json({ event })
}

module.exports = {
  handleUpdateEvent,
  handleGetEvent,
  middlewareGetEvent,
  handleCreateEvent,
  handleGetEvents
}
