import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconMusic from './IconMusic';

const Control = () => {
  const [playTrack, setPlayTrack] = useState(false);

  const soundToggleControl = async () => {
    await toggleBackgroundMusic();
    setPlayTrack((prev) => !prev);
    console.log(playSound);
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={soundToggleControl}>
        {playTrack ? (
          <IconMusic onPlay={playTrack} />
        ) : (
          <IconMusic onPlay={playTrack} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Control;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    // position: 'absolute',
    // top: 60,
    // right: 80,
  },
});
