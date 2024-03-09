const AWS = require('aws-sdk');
const express = require('express');
const app = express();
app.use(express.json());

const dynamoDB = new AWS.dynamoDB.DocumentClient({
    region: 'us-east-1',
    endpoint: "http://localstack:4566",
    accessKeyId: 'test',
    secretAccessKey: 'test',
});

app.post('/reserve', async (req, res)=> {
    const {id, customerName, hotelName, reservationDate } = req.body;
    try {
        await dynamoDB.put({
            TableName: "Reservations",
            Item: {id, customerName, hotelName, reservationDate, status: "PENDING" }
        }).promise();
        res.json({ message: "Reserva criada com sucesso ", id });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log('Service hotel executando na porta ${PORT}'));
