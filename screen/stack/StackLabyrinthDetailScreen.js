import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const StackLabyrinthDetailScreen = ({ route }) => {
  const { landmark } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={landmark.image} style={styles.image} />
      <Text style={styles.title}>{landmark.name}</Text>
      <Text style={styles.location}>Location: {landmark.location}</Text>
      <Text style={styles.description}>{landmark.description}</Text>
      <Text style={styles.subtitle}>Historical Significance:</Text>
      <Text style={styles.text}>{landmark.historicalSignificance}</Text>
      <Text style={styles.subtitle}>Interesting Facts:</Text>
      {landmark.interestingFacts.map((fact, index) => (
        <Text key={index} style={styles.fact}>• {fact}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  location: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
  },
  fact: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default StackLabyrinthDetailScreen;