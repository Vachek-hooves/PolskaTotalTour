import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TabNavigator');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/image/bg/welcome.png')}
      style={styles.container}
    
    >
      <Text style={styles.text}>
        Welcome to Poland Total Explore - your personal guide to the wonders of Poland! Discover the most fascinating places, routes, and cultural treasures of this beautiful country.
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
  },
});

export default WelcomeScreen;
