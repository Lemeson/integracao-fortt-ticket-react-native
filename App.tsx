import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import Home from './pages/Home';
import Account from './components/Account';
import { View, StyleSheet } from 'react-native';
import { Session } from '@supabase/supabase-js';
import checkSession from './controller/checkSession';
import ForgotPassword from './pages/RedefinicaoSenha';
import TenantScreen from './pages/Tenant3cx'

const Stack = createStackNavigator();

export default function App() {
  const session = checkSession(); // Verificar se a sessão está ativa

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Se o usuário estiver logado, navegue para a Home */}
        {session && session.user ? (
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Tenant" component={TenantScreen} options={{ title: 'Status do Sistema' }} />
          </>
        ) : (
          // Se o usuário não estiver logado, mostre a tela de autenticação
          <>
            <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Recuperar Senha' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
