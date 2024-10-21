import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

const StackQuizStudyScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/gamePlay/quiz/bg/cities.png')}
      resizeMode="cover"
      style={styles.container}
    ></ImageBackground>
  );
};

export default StackQuizStudyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
