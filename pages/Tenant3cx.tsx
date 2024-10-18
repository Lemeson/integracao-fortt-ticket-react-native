// src/screens/TenantScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { login, getSystemStatus } from '../controller/3cxController';

const TenantScreen = () => {
  // Estados para os dados de login e status
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [token, setToken] = useState<string | null>(null); // Armazena o token após o login
  const [systemStatus, setSystemStatus] = useState<any | null>(null); // Armazena o status do sistema

  // Função de login que chama a API
  const handleLogin = async () => {
    try {
      // Chame a função login com os parâmetros na ordem correta
      const token = await login(securityCode, password, username);
      setToken(token); // Armazenando o token após o login
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
     // fetchSystemStatus(token); // Faz a requisição para obter o status do sistema (descomentando isso, você obterá o status após o login)
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  // Função para buscar o status do sistema usando o token
  const fetchSystemStatus = async (token: string) => {
    try {
      const status = await getSystemStatus(token);
      setSystemStatus(status); // Armazenando o status do sistema
    } catch (error) {
      Alert.alert('Erro', 'Falha ao obter o status do sistema.');
    }
  };

  return (
    <View style={styles.container}>
      {!token ? ( // Se não tiver token, mostra o formulário de login
        <View style={styles.loginForm}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Código de Segurança (se houver)"
            value={securityCode}
            onChangeText={setSecurityCode}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      ) : ( // Se já tiver token, mostra as informações do sistema
        <View style={styles.statusContainer}>
          <Text style={styles.title}>Status do Sistema</Text>
          {systemStatus ? (
            <>
              <Text>FQDN: {systemStatus.FQDN}</Text>
              <Text>Versão: {systemStatus.Version}</Text>
              <Text>Status: {systemStatus.Activated ? 'Ativo' : 'Inativo'}</Text>
            </>
          ) : (
            <Text>Carregando status...</Text>
          )}
          <Button title="Sair" onPress={() => setToken(null)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginForm: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  statusContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default TenantScreen;
