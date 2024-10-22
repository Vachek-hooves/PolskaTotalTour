import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Modal, ImageBackground, SafeAreaView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { architecturePoland } from '../../data/architecturePoland';
import tree from '../../assets/gamePlay/labyrinth/tree.png'

const { width, height } = Dimensions.get('window');
const GRID_SIZE = 11;
const CELL_SIZE = Math.floor(width * 0.8 / GRID_SIZE); // Reduced to 80% of screen width
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
          cell === 1 && styles.wall,
          isPlayer && styles.player,
          isEnd && styles.end,
          typeof cell === 'object' && styles.landmark,
        ]}
      />
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
        {/* <Text style={styles.title}>Labyrinth Game</Text> */}
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
        <View style={styles.modalView}>
          {currentLandmark && (
            <>
              <Text style={styles.modalTitle}>{currentLandmark.name}</Text>
              <Text style={styles.modalText}>Location: {currentLandmark.location}</Text>
              <Text style={styles.modalText}>{currentLandmark.description}</Text>
              <Text style={styles.modalText}>Historical Significance: {currentLandmark.historicalSignificance}</Text>
              <Text style={styles.modalTitle}>Interesting Facts:</Text>
              {currentLandmark.interestingFacts.map((fact, index) => (
                <Text key={index} style={styles.modalText}>• {fact}</Text>
              ))}
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
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
    width: width * 0.9,
    height: width * 0.9 * (16/9), // Maintain 9:16 aspect ratio
    maxHeight: height - CONTROLS_HEIGHT - TAB_BAR_HEIGHT - 100, // Adjust based on other elements
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
    borderColor: 'rgba(204, 204, 204, 0.3)',
  },
  wall: {
    backgroundColor: 'rgba(51, 51, 51, 0.7)',
    borderRadius: 6,
  },
  player: {
    backgroundColor: 'rgba(0, 0, 255, 0.7)',
    borderRadius: CELL_SIZE / 2,
  },
  end: {
    backgroundColor: 'rgba(0, 255, 0, 0.7)',
    borderRadius: 6,
  },
  landmark: {
    backgroundColor: 'rgba(255, 255, 0, 0.7)',
    borderRadius: 6,
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});

export default TabLabirinthGameScreen;
