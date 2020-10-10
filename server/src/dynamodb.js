const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'sa-east-1',
  convertEmptyValues: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

module.exports = dynamodb
