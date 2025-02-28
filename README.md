
# Fullstack Básico

Esse projeto é um fullstack básico feito com Angular e NestJS. Ele possui campos básicos de produto e de pedidos, é possível adicionar, listar, editar e excluir um produto, e criar e retornar pedidos que contém produtos nele. O backend usa o redis para coleta eficiente do banco de dados.


## Variáveis de Ambiente

Para rodar este projeto, para o backend você precisará adicionar e preencher na raíz da pasta apps/back em um arquivo .env as seguinte variáveis de ambiente:

`NODE_ENV`

`PORT`

`MONGO_URI`

`JWT_SECRET`

`JWT_EXPIRE_TIME`

`REDIS_URL`

E para o frontend você precisará alterar os arquivos dentro da pasta apps/front/environments para modificar a URL da API (que por padrão está apontada localmente)

`API_URL`
## Rodar o projeto com o Docker

Certifique-se de ter o Docker e o Docker Compose instalados e rodando, e então execute estes comandos na raíz do projeto:

```bash
  docker-compose build
  docker-compose up
```
Caso você esteja com o Redis rodando é sugerível parar a execução dele para evitar conflitos com o Redis do docker. 

## Rodar o Projeto em Desenvolvimento localmente

Certifique-se de ter o Redis instalado e rodando, e sua URL corretamente colocada na váriavel de ambiente, e então:

Para o backend:

```bash
  cd apps/back
  npm install
  npm run start:dev
```

Para o frontend:

```bash
  cd apps/front
  npm install
  npm run start
```

Se quiser rodar os dois ao mesmo tempo no mesmo terminal: 

```bash
  npm run install-all
  npm run start-all:dev
```
## Rodar o Projeto em Produção localmente

Certifique-se de ter o Redis instalado e rodando, e sua URL corretamente colocada na váriavel de ambiente, e caso esteja no linux certifique-se de ter permissões sudo para realizar os builds, e então:

Para o backend:

```bash
  cd apps/back
  npm install
  npm run build
  npm run start:prod
```

Para o frontend:

```bash
  cd apps/front
  npm install
  npm run build
  npm run serve:ssr:front
```

Se quiser rodar os dois ao mesmo tempo no mesmo terminal:

```bash
  npm run install-all
  npm run build-all
  npm run start-all:prod
```
