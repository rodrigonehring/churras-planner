const AWS = require('aws-sdk')

let credentials

if (process.env.IS_OFFLINE) {
  credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
}

const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'sa-east-1',
  convertEmptyValues: true,
  credentials
})

module.exports = dynamodb
