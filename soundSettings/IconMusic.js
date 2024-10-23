import { StyleSheet, Text, View } from 'react-native';

const IconMusic = ({ onPlay }) => {
  return (
    // <View
    //   style={[
    //     styles.mainContainer,
    //     {
    //       backgroundColor: onPlay ? '#1e7600' : '#02909c',
    //       padding: 10,
    //       borderRadius: 50,
    //     },
    //   ]}
    // >
    <Image
      // source={require('../../assets/image/sound/soundCircle.png')}
      source={require('../assets/icons/tabBar/music.png')}
      style={[
        styles.harpImage,
        { width: 60, height: 70, tintColor: onPlay ? 'white' : 'red' },
      ]}
      //   resizeMode="contain"
    />
    // </View>
  );
};

export default IconMusic;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 2,
    borderColor: '#CD7F32', // Bronze color for border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    left: -20,
  },
});
