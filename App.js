import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider } from './store/context';
import WelcomeScreen from './screen/WelcomeScreen';
import TabHomeScreen from './screen/tab/TabHomeScreen';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';
import { TabQuizScreen } from './screen/tab';
import { StackQuizHistoryScreen, StackQuizStudyScreen } from './screen/stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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
          height: 60,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#CCCCCC',
      }}
    >
      <Tab.Screen name="TabQuizScreen" component={TabQuizScreen} />
      <Tab.Screen
        name="TabHomeScreen"
        component={TabHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={{ marginTop: 5 }}>
              {/* Add your icon component here */}
            </View>
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
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
