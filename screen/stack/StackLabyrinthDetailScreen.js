import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const StackLabyrinthDetailScreen = ({ route }) => {
  const { landmark } = route.params;
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#8A2BE2', '#191970']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView style={styles.scrollView}>
        <ImageBackground source={landmark.image} style={styles.imageBackground}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradientOverlay}
          >
            <Text style={styles.title}>{landmark.name}</Text>
            <Text style={styles.location}>{landmark.location}</Text>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: landmark.coordinates.latitude,
              longitude: landmark.coordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: landmark.coordinates.latitude,
                longitude: landmark.coordinates.longitude,
              }}
              title={landmark.name}
              description={landmark.location}
            />
          </MapView>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.description}>{landmark.description}</Text>
          <Text style={styles.subtitle}>Historical Significance:</Text>
          <Text style={styles.text}>{landmark.historicalSignificance}</Text>
          <Text style={styles.subtitle}>Interesting Facts:</Text>
          {landmark.interestingFacts.map((fact, index) => (
            <Text key={index} style={styles.fact}>• {fact}</Text>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.returnButtonText}>Return to Labyrinth</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: height * 0.4, // 40% of screen height
    justifyContent: 'flex-end',
  },
  gradientOverlay: {
    height: '50%',
    justifyContent: 'flex-end',
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  location: {
    fontSize: 18,
    color: '#CCCCCC',
  },
  mapContainer: {
    height: 350,
    width: '100%',
    marginTop: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    padding: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#FFFFFF',
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  fact: {
    fontSize: 16,
    marginLeft: 10,
    color: '#FFFFFF',
  },
  returnButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  returnButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StackLabyrinthDetailScreen;
