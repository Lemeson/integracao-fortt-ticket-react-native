// src/screens/TenantScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { loginAndFetchTokens, fetchSystemStatuses } from '../controller/3cxController';

const TenantScreen = () => {
  // Estados para armazenar tokens e status
  const [systemStatuses, setSystemStatuses] = useState<any[]>([]);

  // Lista de PBX com suas credenciais
  const pbxList = [
    {
      url: 'https://fortt.my3cx.com.br/webclient/api/Login/GetAccessToken',
      securityCode: "",
      username: '113',
      password: 'La@10laa2005',
      statusListURL: 'https://fortt.my3cx.com.br/xapi/v1/SystemStatus'
    },
    {
      url: 'https://forttcloud021.my3cx.com.br:5001/webclient/api/Login/GetAccessToken',
      securityCode: "",
      username: '0000',
      password: 'frt@FDB&2134',
      statusListURL: 'https://forttcloud021.my3cx.com.br:5001/xapi/v1/SystemStatus'
    },
    // Adicione mais PBX aqui, se necessário
  ];

  // Função que faz login e busca status de todos os PBX
  const handleFetchStatuses = async () => {
    try {
      const tokens = await loginAndFetchTokens(pbxList); // Obtém tokens de todos os PBX
      const statuses = await fetchSystemStatuses(tokens); // Busca status usando os tokens
      setSystemStatuses(statuses); // Armazena os status
      Alert.alert('Sucesso', 'Status dos sistemas atualizados!');
    } catch (error: any) {
      console.error("Erro ao buscar status:", error); // Log para depuração
      Alert.alert('Erro', `Falha ao buscar status dos sistemas: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Buscar Status dos PBX" onPress={handleFetchStatuses} />
      <FlatList
        data={systemStatuses}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.statusItem}>
            <Text>PBX URL: {item.url}</Text>
            <Text>FQDN: {item.status.FQDN}</Text>
            <Text>Versão: {item.status.Version}</Text>
            <View
              style={[
                styles.indicator,
                { backgroundColor: item.status.Activated ? 'green' : 'red' },
              ]}
              />
              <Text style={styles.statusText}>
                Status: {item.status.Activated ? 'Ativo' : 'Inativo'}
              </Text>
          </View>          
          )
        }
      />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  statusText: {
    fontSize: 16,
  },
});

export default TenantScreen;
