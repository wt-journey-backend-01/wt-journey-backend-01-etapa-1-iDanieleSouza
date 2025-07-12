const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota de sugestão via formulário GET
app.get('/sugestao', (req, res) => {
  const { nome, ingredientes } = req.query;
  res.send(`
    <h1>Obrigado pela sugestão, ${nome}!</h1>
    <p>Ingredientes: ${ingredientes}</p>
    <a href="/">Voltar</a>
  `);
});

// Página de contato
app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

// Envio do formulário de contato (POST)
app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  res.send(`
    <h1>Mensagem recebida!</h1>
    <p>Nome: ${nome}</p>
    <p>Email: ${email}</p>
    <p>Assunto: ${assunto}</p>
    <p>Mensagem: ${mensagem}</p>
    <a href="/">Voltar</a>
  `);
});

// Rota da API que retorna os lanches
app.get('/api/lanches', (req, res) => {
  const lanches = require('./public/data/lanches.json');
  res.json(lanches);
});

// Rota 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});

