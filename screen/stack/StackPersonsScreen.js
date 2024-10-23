import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { famousPeople } from '../../data/famousPeople';

const PersonCard = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={item.image} style={styles.personImage} />
    <LinearGradient
      colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
      style={styles.cardOverlay}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.years}>{item.yearsOfLife}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const StackPersonsScreen = () => {
  const navigation = useNavigation();
  const [selectedPerson, setSelectedPerson] = useState(null);

  const renderPersonCard = ({ item }) => (
    <PersonCard item={item} onPress={() => setSelectedPerson(item)} />
  );

  return (
    <ImageBackground
      source={require('../../assets/gamePlay/explorer/famous.png')}
      style={styles.mainContainer}
      blurRadius={10}
    >
      <View
        colors={['rgba(138, 43, 226, 0.8)', 'rgba(25, 25, 112, 0.8)']}
        style={styles.overlay}
      >
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Famous Polish People</Text>
          <FlatList
            data={famousPeople}
            renderItem={renderPersonCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity
            style={styles.returnButtonContainer}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={['#8A2BE2', '#191970']}
              style={styles.returnButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.returnButtonText}>Return</Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <Modal
        visible={selectedPerson !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedPerson(null)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#8A2BE2', '#191970']}
            style={styles.modalContent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedPerson && (
                <>
                  <Image
                    source={selectedPerson.image}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalName}>{selectedPerson.name}</Text>
                  <Text style={styles.modalYears}>
                    {selectedPerson.yearsOfLife}
                  </Text>
                  <Text style={styles.modalDescription}>
                    {selectedPerson.description}
                  </Text>
                  <Text style={styles.modalSubtitle}>Impact:</Text>
                  <Text style={styles.modalText}>{selectedPerson.impact}</Text>
                  <Text style={styles.modalSubtitle}>Interesting Fact:</Text>
                  <Text style={styles.modalText}>
                    {selectedPerson.interestingFact}
                  </Text>
                </>
              )}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedPerson(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  personImage: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  years: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  returnButtonContainer: {
    padding: 20,
  },
  returnButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%',
    borderRadius: 20,
    padding: 20,
  },
  modalImage: {
    width: '100%',
    height: 500,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  modalYears: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 10,
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StackPersonsScreen;
