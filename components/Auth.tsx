import React, { useState } from 'react';
import { Alert, View, Image } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button, Input } from '@rneui/themed';
import '../styles/styleSign.css';
import { logoImage, styles } from '../styles/styles';
import { NavigationProp } from '@react-navigation/native';

type AuthProps = {
  navigation: NavigationProp<any>; // Tipagem para o objeto de navegação
};

export default function Auth({ navigation }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image source={logoImage} style={styles.logo} />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
            inputStyle={styles.inputTextWhite}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            title="Sign in"
            disabled={loading}
            onPress={() => signInWithEmail()}
            titleStyle={styles.buttonText}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            title="Cadastrar"
            disabled={loading}
            onPress={() => signUpWithEmail()}
            titleStyle={styles.buttonText}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Button
            title="Esqueci minha senha"
            onPress={() => navigation.navigate('ForgotPassword')}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
        </View>
      </View>
    </View>
  );
}
