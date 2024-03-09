const AWS = require('aws-sdk');
const express = require('express');
const app = express();
app.use(express.json());

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localstack:4566',
  accessKeyId: 'test',
  secretAccessKey: 'test'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.post('/notify', async (req, res) => {
  const { notificationId, message } = req.body;
  const params = {
    TableName: 'Notifications',
    Item: {
      notificationId: notificationId,
      message: message,
      timestamp: new Date().toISOString()
    }
  };

  try {
    await dynamoDB.put(params).promise();
    res.json({ success: true, message: 'Notificacao enviada' });
  } catch (err) {
    console.error('Erro  ao enviar notificacao:', err);
    res.status(500).json({ success: false, message: 'Falha ao enviar a notificacao' });
  }
});

const port = 3002;
app.listen(port, () => console.log(`Service de notificacao executando na porta ${port}`));
