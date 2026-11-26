# Mensageiro Local — MVC

Refatoração da Sprint 06. A interface usa fetch GET/POST e atualiza a lista a cada 3 segundos. Não há autenticação: não use dados pessoais reais nem exponha na internet.

## Executar

```bash
npm install
npm start
```

Abra http://localhost:3000 no navegador. Execute os comandos na raiz do projeto.

## Camadas

- `server.js`: configuração do Express e montagem das rotas.
- `routes/`: associação dos métodos HTTP e URLs aos controllers.
- `controllers/`: validação de entradas e respostas HTTP.
- `models/mensagemModel.js`: persistência JSON, fila de gravações, criação, busca e contagem.
- `views/`: HTML, CSS e JavaScript originais, servidos estaticamente. Não usa EJS.
- `data/mensagens.json`: armazenamento original.
