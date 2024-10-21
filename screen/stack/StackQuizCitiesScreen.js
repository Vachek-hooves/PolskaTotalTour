import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { useAppContext } from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const StackQuizCitiesScreen = () => {
  const { citiesQuizData } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = citiesQuizData[currentQuestionIndex];

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + currentQuestion.score);
    }

    if (currentQuestionIndex + 1 < citiesQuizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  };

  if (!currentQuestion) {
    return <Text>Loading...</Text>;
  }

  return (
    <ImageBackground
      source={require('../../assets/gamePlay/quiz/bg/cities.png')}
      resizeMode="cover"
      style={styles.container}
    >
      {!showResult ? (
        <View style={styles.quizContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handleAnswer(option)}
              >
                <LinearGradient
                  colors={['#8A2BE2', '#191970']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  opacity={0.9}
                >
                  <Text style={styles.buttonText}>{option}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {citiesQuizData.length}
          </Text>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>Your Score: {score}</Text>
          <TouchableOpacity style={styles.button} onPress={restartQuiz}>
            <LinearGradient
              colors={['#8A2BE2', '#191970']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              opacity={0.9}
            >
              <Text style={styles.buttonText}>Restart Quiz</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

export default StackQuizCitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: width * 0.9,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#191970',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '48%', // Slightly less than 50% to account for space between buttons
    height: 60,
    marginBottom: 15,
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
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  progressText: {
    marginTop: 20,
    fontSize: 14,
    color: '#191970',
  },
  resultContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.9,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#191970',
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#191970',
  },
});
