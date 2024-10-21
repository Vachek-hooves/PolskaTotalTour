import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

const StackPersonsScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/gamePlay/explorer/famous.png')}
      style={styles.mainContainer}
    ></ImageBackground>
  );
};

export default StackPersonsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
