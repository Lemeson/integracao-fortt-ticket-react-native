import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Button, StyleSheet, GestureResponderEvent } from 'react-native';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { styles } from '../styles/styles';
import { AtualizarClientesTomTicket } from '../controller/tomTicketOMIEController';

export default function HomeScreen({ navigation }: { navigation: any }) {

  const [session, setSession] = useState<Session | null>(null);
  
  useEffect(() => {
    // Obtém a sessão diretamente ao montar o componente
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);
  
  const handleLeftButton = () => {
    Alert.alert('Voltar');
  };

  const handleRightButton = () => {
    supabase.auth.signOut()
  };

  async function fetchAndSyncClients(): Promise<void> {
      try {
        await AtualizarClientesTomTicket();
        console.log('Clientes sincronizados com sucesso.');
      } catch (error) {
        console.error('erro ao sincronizar clientes:', error)
      }
  }

  return (
    <View style={stylesI.container}>
      {/* Usando o componente Header */}
      <Header
        title="Sistema de Sincronização TomTicket OMIE Fortt"
        leftButton={handleLeftButton}
        rightButton={handleRightButton}
        leftButtonText="Voltar"
        rightButtonText="Sign Out"
        navigation={navigation}  // Passa o navigation para o Header
      />
      <View style={styles.container}>
      <View style={styles.card}>
        <Button title="Atualizar Clientes" onPress={fetchAndSyncClients} />
      </View>
      </View>
    </View>
  );
}

const stylesI = StyleSheet.create({
  container: {
    flex: 1,
  },
});git add .