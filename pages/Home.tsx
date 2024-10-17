import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

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

  return (
    <View style={styles.container}>
      {/* Usando o componente Header */}
      <Header
        title="Página Inicial"
        leftButton={handleLeftButton}
        rightButton={handleRightButton}
        leftButtonText="Voltar"
        rightButtonText="Sign Out"
        navigation={navigation}  // Passa o navigation para o Header
      />

      {/* Conteúdo da tela */}
      <Text>Bem-vindo à Página Inicial!</Text>

      {/* Link para navegar para a TenantScreen */}
      <Button title="Ver Status do Sistema" onPress={() => navigation.navigate('Tenant')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
