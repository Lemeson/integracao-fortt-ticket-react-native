import React, { useState } from 'react';
import { View, Alert, Image } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button, Input } from '@rneui/themed';
import { logoImage, styles } from '../styles/styles';
import { NavigationProp } from '@react-navigation/native';
import '../styles/styleSign.css';



type ForgotPasswordProps = {
    navigation: NavigationProp<any>; // Tipagem para navegação
};

export default function ForgotPassword({ navigation }: ForgotPasswordProps) {
    const [email, setEmail] = useState('');

    async function handlePasswordReset() {
        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            Alert.alert('Erro', error.message);
        } else {
            Alert.alert('Sucesso', 'Verifique seu e-mail para redefinir a senha.');
            navigation.navigate('Auth');
        }
    }

    return (
        <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.logo} />
                </View>
                <br></br>
                <Input
                    label="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize="none"
                />
                <Button
                    title="Enviar e-mail de recuperação"
                    onPress={handlePasswordReset}
                    titleStyle={styles.buttonText}
                />

            </View>
        </View>
    );
}
