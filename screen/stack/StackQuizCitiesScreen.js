import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions, Animated, Alert } from 'react-native';
import { useAppContext } from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const StackQuizCitiesScreen = ({ navigation }) => {
  const { citiesQuizData, saveQuizScore, citiesHighScore, hintCount, useHint, exchangeScoreForHint } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [availableOptions, setAvailableOptions] = useState([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const optionAnimations = useRef([]).current;

  const currentQuestion = citiesQuizData[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      setAvailableOptions(currentQuestion.options);
      while (optionAnimations.length < currentQuestion.options.length) {
        optionAnimations.push(new Animated.Value(0));
      }
      animateQuestion();
    }
  }, [currentQuestionIndex, citiesQuizData]);

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
      if (currentQuestionIndex + 1 < citiesQuizData.length) {
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

  const handleHint = async () => {
    const hintUsed = await useHint();
    if (hintUsed) {
      const incorrectOptions = availableOptions.filter(option => option !== currentQuestion.answer);
      const optionsToRemove = incorrectOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
      setAvailableOptions(availableOptions.filter(option => !optionsToRemove.includes(option)));
    } else {
      Alert.alert("No hints left", "Would you like to exchange 10 points for a hint?", [
        {
          text: "Yes",
          onPress: async () => {
            const exchanged = await exchangeScoreForHint(score, 'cities');
            if (exchanged) {
              setScore(score - 10);
              handleHint();
            } else {
              Alert.alert("Not enough points", "You need at least 10 points to exchange for a hint.");
            }
          }
        },
        {
          text: "No",
          style: "cancel"
        }
      ]);
    }
  };

  useEffect(() => {
    if (showResult) {
      saveQuizScore('cities', score);
    }
  }, [showResult, score]);

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
      source={require('../../assets/gamePlay/quiz/bg/cities.png')}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.overlay}>
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
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${((currentQuestionIndex + 1) / citiesQuizData.length) * 100}%` }]} />
            </View>
            <View style={styles.topBar}>
              <Text style={styles.scoreText}>Score: {score}</Text>
              <TouchableOpacity style={styles.hintButton} onPress={handleHint}>
                {/* <Icon name="lightbulb-o" size={24} color="#FFD700" /> */}
                <Text style={styles.hintText}>{hintCount}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            <View style={styles.optionsContainer}>
              {availableOptions.map((option, index) => (
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
                    >
                      <Text style={styles.buttonText}>{option}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} of {citiesQuizData.length}
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
            <Text style={styles.highScoreText}>High Score: {citiesHighScore}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TabQuizScreen')}>
              <LinearGradient
                colors={['#8A2BE2', '#191970']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Menu</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={restartQuiz}>
              <LinearGradient
                colors={['#8A2BE2', '#191970']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Restart Quiz</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizContainer: {
    padding: 20,
    borderRadius: 10,
    width: width * 0.9,
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 5,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
  },
  hintText: {
    color: '#FFFFFF',
    marginLeft: 5,
    fontWeight: 'bold',
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
  highScoreText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#FFD700',
  },
});

export default StackQuizCitiesScreen;
