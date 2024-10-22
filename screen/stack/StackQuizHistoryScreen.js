import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useAppContext } from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const StackQuizHistoryScreen = () => {
  const { polishHistoryQuizData } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const optionAnimations = useRef([]).current;

  const currentQuestion = polishHistoryQuizData[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      // Ensure optionAnimations has the correct number of elements
      while (optionAnimations.length < currentQuestion.options.length) {
        optionAnimations.push(new Animated.Value(0));
      }
      animateQuestion();
    }
  }, [currentQuestionIndex, polishHistoryQuizData]);

  const animateQuestion = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.5);
    optionAnimations.forEach(anim => anim.setValue(0));

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      ...optionAnimations.map(anim =>
        Animated.spring(anim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        })
      ),
    ]).start();
  };

  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);
    const isCorrect = selectedAnswer === currentQuestion.answer;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + currentQuestion.score);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < polishHistoryQuizData.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  if (!currentQuestion) {
    return <Text>Loading...</Text>;
  }

  const getButtonColors = (option) => {
    if (selectedAnswer === option) {
      return isAnswerCorrect ? ['#4CAF50', '#45a049'] : ['#FF6347', '#FF4500'];
    }
    return ['#8A2BE2', '#191970'];
  };

  return (
    <ImageBackground
      source={require('../../assets/gamePlay/quiz/bg/history.png')}
      resizeMode="cover"
      style={styles.container}
    >
      {!showResult ? (
        <Animated.View 
          style={[
            styles.quizContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: optionAnimations[index] || new Animated.Value(1),
                  transform: [
                    {
                      translateY: (optionAnimations[index] || new Animated.Value(1)).interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                    {
                      scale: optionAnimations[index] || new Animated.Value(1),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                >
                  <LinearGradient
                    colors={getButtonColors(option)}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    opacity={0.9}
                  >
                    <Text style={styles.buttonText}>{option}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {polishHistoryQuizData.length}
          </Text>
        </Animated.View>
      ) : (
        <Animated.View 
          style={[
            styles.resultContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
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
        </Animated.View>
      )}
    </ImageBackground>
  );
};

export default StackQuizHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    borderRadius: 10,
    width: width * 0.9,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 30
  },
  button: {
    width: width * 0.4,
    height: 60,
    marginBottom: 15,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#FFFFFF'
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
    color: '#FFFFFF',
  },
  resultContainer: {
    backgroundColor: 'rgba(25, 25, 112, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.9,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#FFFFFF',
  },
});
