// src/api/api.ts
import axios from 'axios';

import { LoginResponse, SystemStatusResponse } from './types';

// URL base da API
const API_URL = 'https://fortt.my3cx.com.br/xapi/v1';

// URL do Login
const API_URL_LOGIN = 'https://fortt.my3cx.com.br/webclient/api/Login/GetAccessToken';

// Função para fazer login e obter o token
export const login = async (
  securityCode: string,
  password: string,
  username: string,
): Promise<string> => {
  try {
    const response = await fetch(API_URL_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Certifique-se de que a API aceita JSON
      },
      body: JSON.stringify({
        SecurityCode: securityCode,
        Password: password,
        Username: username,
      }),
    });

    const data: LoginResponse = await response.json();

    if (response.ok && data.Status === 'AuthSuccess') {
      return data.Token.access_token; // Retorna o token de acesso
    } else {
      throw new Error('Falha na autenticação');
    }
  } catch (error) {
    console.error('Erro no login:', error);
    throw new Error('Falha na autenticação');
  }
};


// Função para obter o status do sistema
export const getSystemStatus = async (token: string): Promise<SystemStatusResponse> => {
  try {
    const response = await axios.post<SystemStatusResponse>(`${API_URL}/SystemStatus`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Adicionar este cabeçalho se necessário
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar status do sistema:', error);
    throw new Error('Falha ao obter status');
  }
};
