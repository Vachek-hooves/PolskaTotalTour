import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Modal, ImageBackground, SafeAreaView } from 'react-native';
import { architecturePoland } from '../../data/architecturePoland';
import tree from '../../assets/gamePlay/labyrinth/tree.png'

const { width } = Dimensions.get('window');
const GRID_SIZE = 11;
const CELL_SIZE = width / GRID_SIZE;

const generateMaze = () => {
  const maze = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      maze[i][j] = Math.random() > 0.2 ? 0 : 1; // 20% chance of being a wall
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
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <Text style={styles.title}>Labyrinth Game</Text>
      <ImageBackground source={require('../../assets/gamePlay/labyrinth/map.png')} style={styles.map} resizeMode='cover'>
      <View style={styles.maze}>
        {maze.map((row, y) => (
          <View key={y} style={styles.row}>
            {row.map((cell, x) => renderCell(cell, x, y))}
          </View>
        ))}
      </View>
        </ImageBackground>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    paddingTop: 40,
    
  },
  map: {
    width: width,
    height: '90%',
    borderRadius: 18,
    overflow: 'hidden'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  maze: {
    // borderWidth: 2,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    // borderWidth: 1,
    borderColor: '#CCC',
  },
  wall: {
    backgroundColor: '#333',
    borderRadius:18
  },
  player: {
    backgroundColor: 'blue',
  },
  end: {
    backgroundColor: 'green',
  },
  controls: {
    // marginTop: 20,
  },
  horizontalControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    margin: 5,
    borderRadius: 5,
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
  landmark: {
    backgroundColor: 'yellow',
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
