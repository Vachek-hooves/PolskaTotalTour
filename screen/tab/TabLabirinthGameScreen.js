import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Modal, ImageBackground, SafeAreaView, Platform, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { architecturePoland } from '../../data/architecturePoland';
import tree from '../../assets/gamePlay/labyrinth/tree.png'
import traveller from '../../assets/gamePlay/labyrinth/traveler.png'

const { width, height } = Dimensions.get('window');
const GRID_SIZE = 11;
const MAP_ASPECT_RATIO = 16 / 9; // Assuming the map.png has a 16:9 aspect ratio
const MAP_WIDTH = width * 0.9; // 90% of screen width
const MAP_HEIGHT = MAP_WIDTH * MAP_ASPECT_RATIO;
const CELL_SIZE = Math.floor(MAP_WIDTH / GRID_SIZE);
const TAB_BAR_HEIGHT = 50; // Approximate height of the tab bar
const CONTROLS_HEIGHT = 150; // Approximate height for controls

const generateMaze = () => {
  const maze = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      maze[i][j] = Math.random() > 0.1 ? 0 : 1; // 20% chance of being a wall
    }
  }
  maze[0][0] = 0; // Start
  maze[GRID_SIZE - 1][GRID_SIZE - 1] = 0; // End

  // Place all landmarks randomly
  const landmarks = [...architecturePoland];
  while (landmarks.length > 0) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    if (maze[y][x] === 0 && !(x === 0 && y === 0) && !(x === GRID_SIZE - 1 && y === GRID_SIZE - 1)) {
      maze[y][x] = landmarks.pop();
    }
  }

  return maze;
};

const TabLabirinthGameScreen = () => {
  const [maze, setMaze] = useState(generateMaze());
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [gameWon, setGameWon] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLandmark, setCurrentLandmark] = useState(null);

  useEffect(() => {
    if (playerPosition.x === GRID_SIZE - 1 && playerPosition.y === GRID_SIZE - 1) {
      setGameWon(true);
    }
    const cell = maze[playerPosition.y][playerPosition.x];
    if (typeof cell === 'object') {
      setCurrentLandmark(cell);
      setModalVisible(true);
    }
  }, [playerPosition]);

  const movePlayer = (dx, dy) => {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (
      newX >= 0 && newX < GRID_SIZE &&
      newY >= 0 && newY < GRID_SIZE &&
      maze[newY][newX] !== 1
    ) {
      setPlayerPosition({ x: newX, y: newY });
    }
  };

  const resetGame = () => {
    setMaze(generateMaze());
    setPlayerPosition({ x: 0, y: 0 });
    setGameWon(false);
  };

  const renderCell = (cell, x, y) => {
    const isPlayer = x === playerPosition.x && y === playerPosition.y;
    const isEnd = x === GRID_SIZE - 1 && y === GRID_SIZE - 1;

    return (
      <View
        key={`${x}-${y}`}
        style={[
          styles.cell,
          isPlayer && styles.player,
          isEnd && styles.end,
        ]}
      >
        {cell === 1 && <Image source={tree} style={styles.treeIcon} />}
        {typeof cell === 'object' && (
          <Image source={cell.image} style={styles.landmarkIcon} />
        )}
        {isPlayer && <Image source={traveller} style={styles.playerIcon} />}
        {isEnd && <View style={styles.endIcon} />}
      </View>
    );
  };

  

  return (
    <LinearGradient
      colors={['#8A2BE2', '#191970']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
       
        <View style={styles.gameArea}>
          <View style={styles.mapContainer}>
            <ImageBackground 
              source={require('../../assets/gamePlay/labyrinth/map.png')} 
              style={styles.map} 
              resizeMode='cover'
            >
              <View style={styles.mazeOverlay}>
                <View style={styles.maze}>
                  {maze.map((row, y) => (
                    <View key={y} style={styles.row}>
                      {row.map((cell, x) => renderCell(cell, x, y))}
                    </View>
                  ))}
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity style={styles.button} onPress={() => movePlayer(0, -1)}>
              <Text style={styles.buttonText}>Up</Text>
            </TouchableOpacity>
            <View style={styles.horizontalControls}>
              <TouchableOpacity style={styles.button} onPress={() => movePlayer(-1, 0)}>
                <Text style={styles.buttonText}>Left</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => movePlayer(1, 0)}>
                <Text style={styles.buttonText}>Right</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => movePlayer(0, 1)}>
              <Text style={styles.buttonText}>Down</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {gameWon && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>You Won!</Text>
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            {currentLandmark && (
              <ImageBackground 
                source={currentLandmark.image} 
                style={styles.modalBackground}
                resizeMode="cover"
              >
                <ScrollView contentContainerStyle={styles.modalContent}>
                  <Text style={styles.modalTitle}>{currentLandmark.name}</Text>
                  <Text style={styles.modalText}>Location: {currentLandmark.location}</Text>
                  <Text style={styles.modalText}>{currentLandmark.description}</Text>
                  <Text style={styles.modalText}>Historical Significance: {currentLandmark.historicalSignificance}</Text>
                  <Text style={styles.modalSubtitle}>Interesting Facts:</Text>
                  {currentLandmark.interestingFacts.map((fact, index) => (
                    <Text key={index} style={styles.modalText}>• {fact}</Text>
                  ))}
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </ScrollView>
              </ImageBackground>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#FFFFFF',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: TAB_BAR_HEIGHT,
  },
  mapContainer: {
    width: MAP_WIDTH,
    height: MAP_HEIGHT - 80,
    overflow: 'hidden',
    borderRadius: 18,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mazeOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maze: {
    width: CELL_SIZE * GRID_SIZE,
    height: CELL_SIZE * GRID_SIZE,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treeIcon: {
    width: CELL_SIZE * 1.6,
    height: CELL_SIZE * 1.6,
    resizeMode: 'contain',
  },
  landmarkIcon: {
    width: CELL_SIZE * 1.6,
    height: CELL_SIZE * 1.6,
    resizeMode: 'contain',
    borderRadius: 10,
    overflow: 'hidden',
  },
  playerIcon: {
    width: CELL_SIZE * 1.6,
    height: CELL_SIZE * 1.6,
    borderRadius: (CELL_SIZE * 0.6) / 2,
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
  },
  endIcon: {
    width: CELL_SIZE * 0.6,
    height: CELL_SIZE * 0.6,
    borderRadius: 6,
    // backgroundColor: 'rgba(0, 255, 0, 0.7)',
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  horizontalControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TabLabirinthGameScreen;
