const dynamodb = require('./dynamodb')
const TableName = 'ChurrasPlanner'

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

async function handleLogin(req, res) {
  console.log(req.body)
  const { email, password } = req.body

  const { Item } = await dynamodb
    .get({
      TableName,
      Key: { hashkey: email, sortkey: 'user' }
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
}

module.exports = { middlewareAuth, handleLogin }
