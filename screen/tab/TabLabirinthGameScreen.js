import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const GRID_SIZE =11;
const CELL_SIZE = width / GRID_SIZE;

const generateMaze = () => {
  // Simple maze generation (you can implement a more complex algorithm)
  const maze = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      maze[i][j] = Math.random() > 0.3 ? 0 : 1; // 30% chance of being a wall
    }
  }
  maze[0][0] = 0; // Start
  maze[GRID_SIZE - 1][GRID_SIZE - 1] = 0; // End
  return maze;
};

const TabLabirinthGameScreen = () => {
  const [maze, setMaze] = useState(generateMaze());
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (playerPosition.x === GRID_SIZE - 1 && playerPosition.y === GRID_SIZE - 1) {
      setGameWon(true);
    }
  }, [playerPosition]);

  const movePlayer = (dx, dy) => {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (
      newX >= 0 && newX < GRID_SIZE &&
      newY >= 0 && newY < GRID_SIZE &&
      maze[newY][newX] === 0
    ) {
      setPlayerPosition({ x: newX, y: newY });
    }
  };

  const resetGame = () => {
    setMaze(generateMaze());
    setPlayerPosition({ x: 0, y: 0 });
    setGameWon(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Labyrinth Game</Text>
      <View style={styles.maze}>
        {maze.map((row, y) => (
          <View key={y} style={styles.row}>
            {row.map((cell, x) => (
              <View
                key={`${x}-${y}`}
                style={[
                  styles.cell,
                  cell === 1 && styles.wall,
                  x === playerPosition.x && y === playerPosition.y && styles.player,
                  x === GRID_SIZE - 1 && y === GRID_SIZE - 1 && styles.end,
                ]}
              />
            ))}
          </View>
        ))}
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
      {gameWon && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>You Won!</Text>
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  maze: {
    borderWidth: 2,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  wall: {
    backgroundColor: '#333',
  },
  player: {
    backgroundColor: 'blue',
  },
  end: {
    backgroundColor: 'green',
  },
  controls: {
    marginTop: 20,
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
});

export default TabLabirinthGameScreen;
