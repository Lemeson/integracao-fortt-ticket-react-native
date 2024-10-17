import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface HeaderProps {
  title: string;
  leftButton: () => void;
  rightButton: () => void;
  leftButtonText: string;
  rightButtonText: string;
  navigation: any;  // Tipo da navegação
}

const Header: React.FC<HeaderProps> = ({ title, leftButton, rightButton, leftButtonText, rightButtonText, navigation }) => {
  return (
    <View style={styles.header}>
      <Button title={leftButtonText} onPress={leftButton} />
      <Text style={styles.title}>{title}</Text>
      <Button title={rightButtonText} onPress={rightButton} />
      
      {/* Link para navegar para a TenantScreen */}
      <Button title="Ir para Tenant" onPress={() => navigation.navigate('Tenant')} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
