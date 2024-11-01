const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Permite receber dados no formato JSON

// Endpoint que lida com requisições POST
app.post('/api/login/data', async (req, res) => {
  //const { SecurityCode, Password, Username } = req.body; // Ajustado para os dados vindos do React Native

  const { apis } = req.body; // Recebe o array de APIs com URL, usuário e senha
  const results = [];

   try {
  //   // Faz a requisição POST à API externa, passando os dados recebidos
  //   const response = await axios.post('https://fortt.my3cx.com.br/webclient/api/Login/GetAccessToken', {
  //     SecurityCode,
  //     Password,
  //     Username,
  //   });

  for (const api of apis) {
    const { url, username, password } = api;
    
    try {
        const response = await axios.post(url, {}, {
            auth: { username, password }
        });
        results.push({ url, status: response.status, data: response.data });
    } catch (error) {
        results.push({ url, status: error.response ? error.response.status : 500, error: error.message });
    }
}

    // Retorna a resposta da API externa para o React Native
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao fazer requisição POST à API externa:', error);
    res.status(500).json({ error: 'Erro ao fazer requisição POST à API externa' });
  }
});

//Atualizar status do sistema
app.get('/api/atualizar/data', async (req, res) => {
    const token = req.headers.authorization; // Pegar o token dos cabeçalhos
  
    if (!token) {
      return res.status(400).json({ error: 'Token não fornecido' });
    }
  
    try {
      // Fazer a requisição GET para a API externa
      const response = await axios.get('https://fortt.my3cx.com.br/xapi/v1/SystemStatus', {
        headers: {
          'Authorization': token, // Usar o token diretamente
          'Content-Type': 'application/json',
        },
      });
  
      // Enviar a resposta de volta ao frontend
      res.json(response.data);
    } catch (error) {
      console.error('Erro ao buscar status do sistema:', error);
      res.status(500).json({ error: 'Falha ao obter status do sistema' });
    }
  });

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
