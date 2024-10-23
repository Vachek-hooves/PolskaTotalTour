import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

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
      <View style={styles.contentWrapper}>
        <LinearGradient
          colors={['rgba(138, 43, 226, 0.8)', 'rgba(25, 25, 112, 0.8)']}
          style={styles.gradientContainer}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.appName}>Poland Total Explore</Text>
            <Text style={styles.subtitle}>
              Your personal guide to the wonders of Poland!
            </Text>
          </View>
        </LinearGradient>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color for emphasis
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
