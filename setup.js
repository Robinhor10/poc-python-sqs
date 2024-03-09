const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB({
  region: 'us-east-1',
  endpoint: "http://localhost:4566",
  accessKeyId: 'test',
  secretAccessKey: 'test',
}) ;

const tables = [
    {
        TableName :  "Reservations",
        KeySchema : [
            {
                AttributeName: "id",
                KeyType: "HASH",
            }
        ],
        AttributeDefinitions: [
            {
                AttributeName: "id",
                AttributeType: "S",
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    },
];

async function createTable(tables) {
    try {
        const result = await dynamoDB.createTable(table).promise();
        console.log('Tabela criada:  ${result.TableDescription.TableName}' );
    } catch (error) {
        console.error('Erro ao criar a tabela:  ${error.message}' );
    }
}

async function setup() {
    for (let table of tables) {
        await createTable(table);
    }
}

setup();