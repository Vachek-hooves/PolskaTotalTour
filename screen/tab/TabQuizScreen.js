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
import { useAppContext } from '../../store/context';

const { width, height } = Dimensions.get('window');

const TabQuizScreen = () => {
  const navigation = useNavigation();
  const { citiesHighScore, historyHighScore } = useAppContext();

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/gamePlay/quiz/bg/quizBg1.png')}
      resizeMode="cover"
    >
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>High Scores</Text>
        {/* <Text style={styles.scoreText}>History Quiz: {historyHighScore}</Text> */}
        <Text style={styles.scoreText}>Cities Quiz: {citiesHighScore}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StackQuizHistoryScreen')}
        >
          <LinearGradient
            colors={['#8A2BE2', '#191970']} // Purple to Deep Blue
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            opacity={0.9}
          >
            <Text style={styles.buttonText}>History</Text>
          </LinearGradient>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StackQuizStudyScreen')}
        >
          <LinearGradient
            colors={['#8A2BE2', '#191970']} // Purple to Deep Blue
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            opacity={0.9}
          >
            <Text style={styles.buttonText}>Study of Cities</Text>
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
  scoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#191970',
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 5,
    color: '#191970',
  },
  buttonContainer: {
    width: width * 0.9,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 90,
    marginBottom: 20,
    borderRadius: 30,
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
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
