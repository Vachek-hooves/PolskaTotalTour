import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const TabQuizScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/gamePlay/quiz/bg/quizBg1.png')}
      resizeMode="cover"
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StackQuizHistoryScreen')}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF8E53']} // Coral to Orange gradient
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.buttonText}>History Quiz</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StackQuizStudyScreen')}
        >
          <LinearGradient
            colors={['#4facfe', '#00f2fe']} // Blue to Cyan gradient
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.buttonText}>Study Quiz</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default TabQuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  buttonContainer: {
    width: width * 0.9,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: height * 0.15,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
