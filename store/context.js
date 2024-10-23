import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { citiesQuiz } from '../data/citiesQuiz';
import { polishHistoryQuiz } from '../data/polishHistoryQuiz';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [citiesQuizData, setCitiesQuizData] = useState([]);
  const [polishHistoryQuizData, setPolishHistoryQuizData] = useState([]);
  const [citiesHighScore, setCitiesHighScore] = useState(0);
  const [historyHighScore, setHistoryHighScore] = useState(0);
  const [hintCount, setHintCount] = useState(5);

  useEffect(() => {
    const initializeQuizData = async () => {
      try {
        // Check if citiesQuiz data exists in AsyncStorage
        const storedCitiesQuiz = await AsyncStorage.getItem('citiesQuiz');
        if (storedCitiesQuiz === null) {
          // If not, save the initial data to AsyncStorage
          await AsyncStorage.setItem('citiesQuiz', JSON.stringify(citiesQuiz));
          setCitiesQuizData(citiesQuiz);
        } else {
          // If exists, load it from AsyncStorage
          setCitiesQuizData(JSON.parse(storedCitiesQuiz));
        }

        // Check if polishHistoryQuiz data exists in AsyncStorage
        const storedPolishHistoryQuiz = await AsyncStorage.getItem('polishHistoryQuiz');
        if (storedPolishHistoryQuiz === null) {
          // If not, save the initial data to AsyncStorage
          await AsyncStorage.setItem('polishHistoryQuiz', JSON.stringify(polishHistoryQuiz));
          setPolishHistoryQuizData(polishHistoryQuiz);
        } else {
          // If exists, load it from AsyncStorage
          setPolishHistoryQuizData(JSON.parse(storedPolishHistoryQuiz));
        }

        // Load high scores
        const storedCitiesHighScore = await AsyncStorage.getItem('citiesHighScore');
        if (storedCitiesHighScore !== null) {
          setCitiesHighScore(parseInt(storedCitiesHighScore, 10));
        }

        const storedHistoryHighScore = await AsyncStorage.getItem('historyHighScore');
        if (storedHistoryHighScore !== null) {
          setHistoryHighScore(parseInt(storedHistoryHighScore, 10));
        }

        // Load hint count
        const storedHintCount = await AsyncStorage.getItem('hintCount');
        if (storedHintCount !== null) {
          setHintCount(parseInt(storedHintCount, 10));
        } else {
          await AsyncStorage.setItem('hintCount', '5');
        }
      } catch (error) {
        console.error('Error initializing quiz data:', error);
      }
    };

    initializeQuizData();
  }, []);

  const saveQuizScore = async (quizType, score) => {
    try {
      if (quizType === 'cities') {
        if (score > citiesHighScore) {
          await AsyncStorage.setItem('citiesHighScore', score.toString());
          setCitiesHighScore(score);
        }
      } else if (quizType === 'history') {
        if (score > historyHighScore) {
          await AsyncStorage.setItem('historyHighScore', score.toString());
          setHistoryHighScore(score);
        }
      }
    } catch (error) {
      console.error('Error saving quiz score:', error);
    }
  };

  const useHint = async () => {
    if (hintCount > 0) {
      const newHintCount = hintCount - 1;
      setHintCount(newHintCount);
      await AsyncStorage.setItem('hintCount', newHintCount.toString());
      return true;
    }
    return false;
  };

  const exchangeScoreForHint = async (score, quizType) => {
    if (score >= 10) {
      const newScore = score - 10;
      const newHintCount = hintCount + 1;
      setHintCount(newHintCount);
      await AsyncStorage.setItem('hintCount', newHintCount.toString());
      await saveQuizScore(quizType, newScore);
      return true;
    }
    return false;
  };

  const value = {
    citiesQuizData,
    polishHistoryQuizData,
    setCitiesQuizData,
    setPolishHistoryQuizData,
    citiesHighScore,
    historyHighScore,
    saveQuizScore,
    hintCount,
    useHint,
    exchangeScoreForHint,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
