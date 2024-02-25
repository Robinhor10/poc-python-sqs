# Meu Projeto -  Python-SQS

Este projeto demonstra como construir uma API em Python que produz mensagens em uma fila SQS do AWS, tudo rodando localmente usando Docker e LocalStack.

## Versões dos serviços utilizados

- `Docker`: 20.10.7 (Certifique-se de ter a Docker Engine instalada para construir e rodar contêineres)
- `Docker Compose`: 1.29.2 (Usado para definir e rodar múltiplos contêineres Docker)
- `LocalStack`: 0.12.10 (Simula serviços da AWS localmente)
- `Python`: 3.8 (Linguagem de programação usada para desenvolver a aplicação)
- `Flask`: 1.1.2 (Framework web utilizado para criar a API)
- `Boto3`: 1.17.49 (SDK da AWS para Python, utilizado para interagir com o SQS)

## Estrutura de Pastas

- `app/`: Contém os arquivos da aplicação Flask.
  - `app.py`: O arquivo principal da aplicação Flask. Define a API que envia mensagens para a fila SQS.
  - `requirements.txt`: Lista todas as dependências Python necessárias para a aplicação.
- `localstack/`: Contém scripts e configurações para o LocalStack, que simula serviços da AWS localmente.
  - `init.sh`: Script de inicialização para criar recursos AWS necessários (como filas SQS) no LocalStack.
- `Dockerfile`: Define como construir a imagem Docker da aplicação Flask.
- `docker-compose.yml`: Arquivo de configuração do Docker Compose. Orquestra a aplicação Flask e o LocalStack para rodar juntos em contêineres Docker.

## Configuração Inicial

### Criar a Fila SQS Manualmente

Se preferir criar a fila SQS manualmente em vez de usar o script `init.sh`, siga estes passos após iniciar o LocalStack:

1. Abra um terminal e execute o seguinte comando para acessar o shell do contêiner do LocalStack:

```bash
docker exec -it <nome_do_container_localstack> /bin/bash
```

2. Dentro do contêiner, use o `awslocal` para criar a fila SQS:

```bash
awslocal sqs create-queue --queue-name my-queue
```

### Executar o Projeto

Para iniciar o projeto, execute o seguinte comando no diretório raiz:

```bash
docker-compose up --build
```

Isso iniciará tanto a aplicação Flask quanto o LocalStack em contêineres Docker separados.

## Testando a API via Insomnia

Para testar a API usando o Insomnia, siga estes passos:

1. **Instale e Abra o Insomnia**: Se ainda não o fez, baixe e instale o Insomnia a partir do [site oficial](https://insomnia.rest/download).

2. **Crie um Novo Request**:
   - Abra o Insomnia e crie um novo Request clicando no botão "New Request".
   - Nomeie o Request como "Enviar Mensagem SQS" e selecione o método `POST`.
   - Clique em "Create".

3. **Configure o Request**:
   - Na barra de URL, insira `http://localhost:5000/send`.
   - Vá para a aba "Body", selecione "JSON" e insira o seguinte JSON no corpo do request:

```json
{
  "message": "Sua mensagem aqui"
}
```

4. **Envie o Request**:
   - Clique no botão "Send" para enviar o request.
   - Se tudo estiver configurado corretamente, você receberá uma resposta indicando que a mensagem foi enviada com sucesso para a fila SQS.

Repita estes passos sempre que quiser testar o envio de mensagens para a fila SQS através da sua API.

---
4. **Verificando se a mensagem foi criada**:

- Abra um terminal e execute o seguinte comando para acessar o shell do contêiner do LocalStack:

```bash
docker exec -it <nome_do_container_localstack> /bin/bash
```

2. Dentro do contêiner, use o `awslocal` para verificar se existem mensagens na fila SQS:

```bash
awslocal sqs receive-message --queue-url http://localhost:4566/000000000000/my-queue



```

