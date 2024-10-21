import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

const StackDishScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/gamePlay/explorer/dishes.png')}
      style={styles.mainContainer}
    ></ImageBackground>
  );
};

export default StackDishScreen;

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
});
