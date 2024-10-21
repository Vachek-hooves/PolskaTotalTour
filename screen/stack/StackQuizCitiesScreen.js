import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../store/context';

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
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {citiesQuizData.length}
          </Text>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>Your Score: {score}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>Restart Quiz</Text>
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
    width: '90%',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#4facfe',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  optionText: {
    color: 'white',
    textAlign: 'center',
  },
  progressText: {
    marginTop: 20,
    fontSize: 14,
  },
  resultContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 20,
  },
  restartButton: {
    backgroundColor: '#4facfe',
    padding: 10,
    borderRadius: 5,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
