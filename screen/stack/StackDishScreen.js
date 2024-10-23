import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Image, Modal, ScrollView, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { dishPolish } from '../../data/dishPolish';

const DishItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.dishItem}>
    <Image source={item.image} style={styles.dishImage} />
    <Text style={styles.dishName}>{item.name}</Text>
  </TouchableOpacity>
);

const StackDishScreen = () => {
  const [selectedDish, setSelectedDish] = useState(null);

  const renderDishItem = ({ item }) => (
    <DishItem
      item={item}
      onPress={() => setSelectedDish(item)}
    />
  );

  return (
    <LinearGradient
      colors={['#8A2BE2', '#191970']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ImageBackground
        source={require('../../assets/gamePlay/explorer/dishes.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
        blurRadius={10}
        
      >
        <View style={styles.overlay}>
        <SafeAreaView></SafeAreaView>
          <Text style={styles.title}>Polish Dishes</Text>
          <FlatList
            data={dishPolish}
            renderItem={renderDishItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
      <Modal
        visible={selectedDish !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedDish(null)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#8A2BE2', '#191970']}
            style={styles.modalContent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <ScrollView>
              {selectedDish && (
                <>
                  <Image source={selectedDish.image} style={styles.modalImage} />
                  <Text style={styles.modalTitle}>{selectedDish.name}</Text>
                  <Text style={styles.modalSubtitle}>History</Text>
                  <Text style={styles.modalText}>{selectedDish.history}</Text>
                  <Text style={styles.modalSubtitle}>Recipe</Text>
                  <Text style={styles.modalSubtitle}>Ingredients:</Text>
                  {selectedDish.recipe.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.modalText}>• {ingredient}</Text>
                  ))}
                  <Text style={styles.modalSubtitle}>Preparation:</Text>
                  {selectedDish.recipe.preparation.map((step, index) => (
                    <Text key={index} style={styles.modalText}>{index + 1}. {step}</Text>
                  ))}
                </>
              )}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedDish(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  dishItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  dishImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  dishName: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '90%',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#FFD700',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StackDishScreen;
