// src/api/types.ts

// Tipagem da resposta de login
export interface LoginResponse {
    Status: string;
    Token: {
      access_token: string;
      expires_in: number;
      token_type: string;
    };
  }
  
  // Tipagem da resposta de status do sistema
  export interface SystemStatusResponse {
    FQDN: string;
    Version: string;
    Activated: boolean;
    [key: string]: any; // Adiciona qualquer outra chave de dados que pode vir da resposta
  }
  