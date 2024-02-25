#!/bin/bash

# Espera o LocalStack iniciar completamente
echo "Aguardando o LocalStack iniciar..."
while ! nc -z localstack 4566; do
  sleep 1
done

# Criar a fila SQS com um período de retenção de mensagens específico
awslocal sqs create-queue --queue-name my-queue --attributes MessageRetentionPeriod=86400