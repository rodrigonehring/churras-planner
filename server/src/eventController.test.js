const dynamodb = require('./dynamodb')
const eventController = require('./eventController')

jest.mock('./dynamodb')

it('handleGetEvents', async () => {
  dynamodb.query = jest.fn(() => {
    return { promise: jest.fn(() => ({ catch: jest.fn(), Items: [1, 2] })) }
  })

  const json = jest.fn()

  await eventController.handleGetEvents({ user: { hashkey: 'fake-hashkey' } }, { json })

  expect(dynamodb.query.mock.calls[0][0].ExpressionAttributeValues[':hashkey']).toBe('fake-hashkey')
  expect(json.mock.calls[0][0]).toStrictEqual({ events: [1, 2] })
})

it('handleCreateEvent', async () => {
  dynamodb.put = jest.fn(() => {
    return { promise: jest.fn(() => ({})) }
  })

  const json = jest.fn()
  const body = { date: '2020-01-01', title: 'fancy title', description: '...' }
  await eventController.handleCreateEvent({ user: { hashkey: 'fake-hashkey' }, body }, { json })

  const result = {
    date: '2020-01-01',
    description: '...',
    guests: [],
    hashkey: 'fake-hashkey',
    obs: undefined,
    sortkey: 'event-2020-01-01-main',
    title: 'fancy title'
  }

  expect(dynamodb.put.mock.calls[0][0]).toStrictEqual({ TableName: 'ChurrasPlanner', Item: result })
  expect(json.mock.calls[0][0]).toStrictEqual(result)
})
