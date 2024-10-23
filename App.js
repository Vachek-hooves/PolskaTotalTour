import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './store/context';
import WelcomeScreen from './screen/WelcomeScreen';
import TabHomeScreen from './screen/tab/TabHomeScreen';
import LinearGradient from 'react-native-linear-gradient';
import { View, Image } from 'react-native';
import { TabPolishExplorer, TabQuizScreen } from './screen/tab';
import {
  StackQuizHistoryScreen,
  StackQuizStudyScreen,
  StackDishScreen,
  StackPersonsScreen,
  StackArchitectureScreen,
  StackQuizCitiesPlayScreen,
  StackQuizHistoryPlayScreen,
} from './screen/stack';
import TabLabirinthGameScreen from './screen/tab/TabLabirinthGameScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,title:'',
        tabBarBackground: () => (
          <LinearGradient
            colors={['#8A2BE2', '#191970']} // Purple to Deep Blue
            style={{ height: '100%' }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 90,
          paddingBottom: 0,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#CCCCCC'+80,
      }}
    >
      <Tab.Screen
        name="TabHomeScreen"
        component={TabHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./assets/icons/tabBar/home.png')} 
              style={{ width: 50, height: 50, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="TabQuizScreen" 
        component={TabQuizScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./assets/icons/tabBar/quiz.png')} 
              style={{ width: 50, height: 50, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="TabPolishExplorer" 
        component={TabPolishExplorer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./assets/icons/tabBar/explore.png')} 
              style={{ width: 50, height: 50, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TabLabirinthGameScreen"
        component={TabLabirinthGameScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={require('./assets/icons/tabBar/labyrinth.png')} 
              style={{ width: 50, height: 50, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen
            name="StackQuizStudyScreen"
            component={StackQuizStudyScreen}
          />
          <Stack.Screen
            name="StackQuizHistoryScreen"
            component={StackQuizHistoryScreen}
          />
          <Stack.Screen name="StackDishScreen" component={StackDishScreen} />
          <Stack.Screen
            name="StackPersonsScreen"
            component={StackPersonsScreen}
          />
          <Stack.Screen
            name="StackArchitectureScreen"
            component={StackArchitectureScreen}
          />
          <Stack.Screen
            name="StackQuizCitiesPlayScreen"
            component={StackQuizCitiesPlayScreen}
          />
          <Stack.Screen
            name="StackQuizHistoryPlayScreen"
            component={StackQuizHistoryPlayScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
