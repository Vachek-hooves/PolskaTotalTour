import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { citiesQuiz } from '../data/citiesQuiz';
import { polishHistoryQuiz } from '../data/polishHistoryQuiz';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [citiesQuizData, setCitiesQuizData] = useState([]);
  const [polishHistoryQuizData, setPolishHistoryQuizData] = useState([]);

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
      } catch (error) {
        console.error('Error initializing quiz data:', error);
      }
    };

    initializeQuizData();
  }, []);

  const value = {
    citiesQuizData,
    polishHistoryQuizData,
    setCitiesQuizData,
    setPolishHistoryQuizData,
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
