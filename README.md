# To-Do List App

Aplicação simples de *To-Do List* com **frontend em Next.js** e **backend em NestJS**.

Permite listar, criar e marcar tarefas como concluídas, com integração entre frontend e backend.


## Pré-requisitos

* [Node.js](https://nodejs.org/en/download) (para rodar usando apenas o node)
* [Docker](https://docs.docker.com/engine/install/) (para rodar via container)

Portas padrão:

* Frontend: `3000`
* Backend: `4000`


## Rodando com Docker

1. Clone o repositório:

```bash
git clone https://github.com/ronanzindev/ten-task-app
cd ten-task-app
```

2. Suba os containers:

**Windows:**

```bash
docker compose up --build -d
```

**Linux / macOS:**

```bash
docker-compose up --build -d
```

3. Acesse:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:4000](http://localhost:4000)
* Swagger Docs: [http://localhost:4000/docs](http://localhost:4000/docs)

4. Parar containers:

```bash
docker compose down
```


## Rodando com Node.js

### Backend (NestJS)

1. Entre na pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Rode os testes (opcional):

```bash
npm run test
```

4. Execute o backend:

```bash
npm run start
```

O backend estará disponível em: `http://localhost:4000`

**Observações:**

* As collections do Postman estão em `backend/collections` para testar a API.
* A documentação OpenAPI está em `http://localhost:4000/docs`.

---

### Frontend (Next.js)

1. Entre na pasta do frontend:

```bash
cd app
```

2. Instale as dependências:

```bash
npm install
```

3. Rode os testes (opcional):

```bash
npm run test
```

4. Execute em produção:

```bash
npm run build
npm run start
```

O frontend estará disponível em: `http://localhost:3000`


## Testes

### Backend

```bash
cd backend
npm run test
```

Testes escritos com **Jest**, cobrindo Service e Controller.

### Frontend

```bash
cd app
npm run test
```

Testes escritos com **React Testing Library** / **Jest**.

