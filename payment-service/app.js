const AWS = require('aws-sdk');
const express = require('express');
const app = express();
app.use(express.json());

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localstack:4566",
  accessKeyId: "test",
  secretAccessKey: "test"
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.post('/payment', (req, res) => {
  const { paymentId, orderId, amount } = req.body;
  const paymentRecord = {
    TableName: "Payments",
    Item: {
      paymentId: paymentId,
      orderId: orderId,
      amount: amount,
      paymentStatus: "completed"
    }
  };

  dynamoDB.put(paymentRecord, (err, data) => {
    if (err) {
      console.error("Erro ao gravar o pagamento: ", err);
      res.status(500).send("Erro ao processar o pagamento");
    } else {
      console.log("Pagamento registrado com sucesso: ", data);
      res.status(200).send("Pagamento processado com sucesso");
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Service pagamento executando na porta ${PORT}`);
});
