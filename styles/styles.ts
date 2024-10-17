import { Button } from "@rneui/themed";
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#093f6e',
    paddingHorizontal: 20,
  },
  
  card: {
    width: 350, // Largura do cartão
    padding: 20, // Espaçamento interno
    backgroundColor: 'white', // Cor de fundo do cartão
    borderRadius: 10, // Bordas arredondadas
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 5, // Elevação para Android
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    color: 'black',
  },
  inputTextWhite: {
    color: 'black', // Para o texto do Input
  },
  logo: {
    width: 120, // Largura da imagem
    height: 120, // Altura da imagem
    resizeMode: 'contain', // Ajusta a imagem dentro do espaço
    marginBottom: 20, // Espaço entre o logo e o formulário
  },
  logoContainer: {
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  button: {
    backgroundColor: 'black',// '#8c0770', // Cor do fundo do botão
    borderRadius: 5, // Raio da borda do botão
    padding: 10, // Espaçamento interno
  },
  buttonText: {
    fontWeight: 'bold', // Texto do botão negrito
    color: '#fff',
  },
});


export const logoImage = require('../assets/logo.jpeg');
