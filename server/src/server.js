const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Permite receber dados no formato JSON

// Endpoint que lida com requisições de login e retorna o token
app.post('/api/login/data', async (req, res) => {
  const api = req.body; // Espera um objeto com as credenciais

  console.log('APIs recebidas:', api);

  try {
    const { SecurityCode, Password, Username, URL } = api; // Acessa as propriedades do objeto

    // Faz a requisição POST à API externa para login
    const response = await axios.post(
      URL,
      {
        Password: Password,
        Username: Username,
        SecurityCode: SecurityCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Retorna o status e os dados da resposta, incluindo o token
    res.json({
      status: response.status, // Status da resposta
      data: response.data, // Dados retornados pela API
    });

  } catch (error) {
    console.error('Erro ao fazer requisição:', error);
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : 'Erro ao fazer requisição à API externa',
    });
  }
});

// Endpoint para atualizar e obter o status do sistema usando o token
app.post('/api/atualizar/data', async (req, res) => {
  const token = req.headers.authorization; // Pegar o token dos cabeçalhos
  const { url } = req.body; // Receber URL do body da requisição

  console.log(token, url);

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' });
  }

  try {
    // Faz a requisição GET para a API externa usando o token
    console.log("esta é a url:  -- > ", url);

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Log dos dados de resposta para depuração
    console.log("Dados de resposta da API 3CX:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao fazer requisição:', error);
    console.error('Detalhes do erro:', error.response ? error.response.data : error.message);
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});
