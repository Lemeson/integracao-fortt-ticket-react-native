import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { View, Text, Button } from 'react-native';
import Config from 'react-native-config';

const omieApiKey = Config.OMIE_API_KEY;
const omieAppSecret = Config.OMIE_APP_SECRET;
const tomTicketBearerToken = Config.TOM_TICKET_BEARER_TOKEN;

//Função primaria que ira chamar a função que ira inserir novos clientes no TomTicket a Partir do OMIE
export async function AtualizarClientesTomTicket() {
    let pagina = 0; // Página inicial

    const urlOMIE = 'https://app.omie.com.br/api/v1/geral/clientes/'

    // Loop para buscar e sincronizar as páginas de clientes
    while (true) {
        try {
            // Fazer requisição para o OMIE para listar os clientes
            const response = await fetch(urlOMIE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    call: 'ListarClientes',
                    app_key: omieApiKey,
                    app_secret: omieAppSecret,
                    param: [{
                        pagina: pagina,
                        registros_por_pagina: 100,
                        apenas_importado_api: 'N',
                    }]
                }),
            });

            const data = await response.json();

            // Se não houver mais clientes, interromper o loop
            if (!data.clientes_cadastro || data.clientes_cadastro.length === 0) {
                break;
            }

            //iterar sobre os clientes recebidos
            for (const clienteOmie of data.clientes_cadastro) {
                const email = clienteOmie.email || '';
                const telefone1_ddd = clienteOmie.telefone1_ddd || '';
                const telefone1_numero = clienteOmie.telefone1_numero || '';

                const dadosCliente = {
                    token: tomTicketBearerToken,
                    identificador: String(clienteOmie.codigo_cliente_omie),
                    nome: clienteOmie.razao_social,
                    email: email,
                    telefone: '${telefone1_ddd}${telefone1_numero}',
                    idioma: 'pt_BR',
                    criarchamados: true,
                };
                // Chame a função para criar o cliente no TomTicket
                await criarClienteTomTicket(dadosCliente);

                // Aguardar 400ms para evitar sobrecarregar a API
                await new Promise(resolve => setTimeout(resolve, 400));
            }

            // Incrementa a página
            pagina++;

        } catch (error) {
            if (error instanceof Error) {
                console.error(`Erro ao sincronizar clientes: ${error.message}`);
            } else {
                console.error(`Erro desconhecido: ${String(error)}`);
            }
        }

    }
}


/**
 * Função para criar cliente no TomTicket usando Fetch API em React Native
 * @param dadosCliente Dados do cliente a serem enviados para o TomTicket
 */
export async function criarClienteTomTicket(dadosCliente: any) {
    const urlTomTicket = `https://api.tomticket.com/criar_cliente/${dadosCliente.token}`;

    try {
        // Fazer requisição para a API do TomTicket
        const response = await fetch(urlTomTicket, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                identificador: dadosCliente.identificador,
                nome: dadosCliente.nome,
                email: dadosCliente.email,
                telefone: dadosCliente.telefone,
                idioma: dadosCliente.idioma,
                criarchamados: dadosCliente.criarchamados ? 'true' : 'false',
                // Adicione outros parâmetros conforme necessário
            }).toString(),
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        // Obter o corpo da resposta
        const retorno = await response.json();

        // Verificar se houve algum erro na resposta da API
        if (retorno.erro) {
            console.log(`Erro: ${retorno.mensagem}, Email: ${dadosCliente.email}, Nome: ${dadosCliente.nome}`);
        } else {
            console.log('Cliente criado com sucesso!');
        }

    } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erro ao criar cliente no TomTicket:', error.message);
            } else {
                console.error('Erro inesperado:', error);
            }
        }
        
}

//       const message = await sendPasswordResetEmail(email);
//       onPress={handlePasswordReset} // Chame a função ao clicar no botão
//            <Button title="Sincronizar Clientes" onPress={fetchAndSyncClients} />

