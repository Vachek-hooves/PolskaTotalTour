import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const TabPolishExplorer = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/gamePlay/explorer/explorerBG.png')}
      style={styles.mainContainer}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StackDishScreen')}
        >
          <LinearGradient
            colors={['#8A2BE2', '#191970']} // Purple to Deep Blue
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            opacity={0.8}
          >
            <Text style={styles.buttonText}>Polish Dishes</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StackPersonsScreen')}
        >
          <LinearGradient
            colors={['#8A2BE2', '#191970']} // Purple to Deep Blue
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            opacity={0.8}
          >
            <Text style={styles.buttonText}>Famous Persons</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StackArchitectureScreen')}
        >
          <LinearGradient
            colors={['#8A2BE2', '#191970']} // Purple to Deep Blue
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            opacity={0.8}
          >
            <Text style={styles.buttonText}>Architecture</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default TabPolishExplorer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
