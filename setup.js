const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localstack:4566',
  accessKeyId: 'test',
  secretAccessKey: 'test'
});

const dynamoDB = new AWS.DynamoDB();

const tables = [
  {
    TableName: 'Reservations',
    KeySchema: [{ AttributeName: 'reservationId', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'reservationId', AttributeType: 'S' }],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
  },
  {
    TableName: 'Payments',
    KeySchema: [{ AttributeName: 'paymentId', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'paymentId', AttributeType: 'S' }],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
  },
  {
    TableName: 'Notifications',
    KeySchema: [{ AttributeName: 'notificationId', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'notificationId', AttributeType: 'S' }],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
  }
];

async function createTable(table) {
  try {
    const result = await dynamoDB.createTable(table).promise();
    console.log(`Table created: ${result.TableDescription.TableName}`);
  } catch (error) {
    console.error(`Error creating table: ${error}`);
  }
}

async function setupTables() {
  for (const table of tables) {
    await createTable(table);
  }
}

setupTables();