import { Image } from 'react-native';

const IconMusic = ({ onPlay }) => {
  return (
    <Image
      source={require('../assets/icons/tabBar/music.png')}
      style={{ width: 50, height: 50, tintColor: !onPlay ? 'yellow' : 'red' }}
    />
  );
};

export default IconMusic;
