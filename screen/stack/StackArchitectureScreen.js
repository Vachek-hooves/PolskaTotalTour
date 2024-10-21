import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const StackArchitectureScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/gamePlay/explorer/architecture.png')}
      style={styles.mainContainer}
    ></ImageBackground>
  );
};

export default StackArchitectureScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
});
