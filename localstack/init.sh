#!/bin/bash

# Criar a fila SQS 
awslocal sqs create-queue --queue-name my-queue