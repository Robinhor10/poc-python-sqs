from flask import Flask, request
import boto3
import os

app = Flask(__name__)

# Configurar cliente do SQS
sqs = boto3.client('sqs', endpoint_url=os.getenv('SQS_ENDPOINT_URL'),
                   aws_access_key_id='test', aws_secret_access_key='test',
                   region_name='us-east-1')

queue_url = os.getenv('SQS_QUEUE_URL')

@app.route('/send', methods=['POST'])
def send_message():
    message_body = request.json.get('message', '')
    response = sqs.send_message(QueueUrl=queue_url, MessageBody=message_body)
    return {'message_id': response['MessageId']}, 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    
