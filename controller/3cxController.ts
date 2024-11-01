// src/api/api.ts
import axios from 'axios';
import { LoginResponse, SystemStatusResponse } from './types';

// Função para fazer login e obter tokens de múltiplos PBX
export const loginAndFetchTokens = async (
  pbxList: { url: string, securityCode: string, username: string, password: string, statusListURL: string }[],
): Promise<{ url: string, token: string }[]> => {
  const tokens = [];

  for (const pbx of pbxList) {
    try {
      const response = await fetch(`http://localhost:3001/api/login/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          URL: pbx.url,
          Password: pbx.password,
          Username: pbx.username,
          SecurityCode: pbx.securityCode,          
        }),
      });

      const data = await response.json(); //LoginResponse = await response.json();
      console.log("Dados recebidos:", data); // Log para depuração
      
      if (data.status == 200) {        //if (data.Status === 'AuthSuccess') {
        tokens.push({ url: pbx.statusListURL, token: data.data.Token.access_token });
      } else {
        console.error(`Falha na autenticação para ${pbx.url}`, data); // Adicionando dados para logs detalhados
      }
      
    } catch (error) {
      console.error(`Erro no login para ${pbx.url}:`, error);
    }
  }

  console.log(tokens);
  return tokens;
};

// Função para obter status do sistema de múltiplos PBX
export const fetchSystemStatuses = async (
  tokens: { url: string, token: string }[],
): Promise<{ url: string, status: SystemStatusResponse }[]> => {
  const statuses = [];

  for (const pbx of tokens) {
    try {
      const response = await fetch(`http://localhost:3001/api/atualizar/data`, {
        method: 'POST',
        headers: {
          'Authorization': `${pbx.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: pbx.url,       
        }),
      });

      const data = await response.json();
      statuses.push({ url: pbx.url, status: data });
    } catch (error) {
      console.error(`Erro ao buscar status de ${pbx.url}:`, error);
    }
  }

  return statuses;
};
