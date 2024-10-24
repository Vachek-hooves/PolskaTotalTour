import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

const StackQuizHistoryScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/gamePlay/quiz/bg/history.png')}
      resizeMode="cover"
      style={styles.container}
    >

    </ImageBackground>
  );
};

export default StackQuizHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
