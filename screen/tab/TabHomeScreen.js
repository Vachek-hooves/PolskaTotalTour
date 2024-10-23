import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import background from '../../assets/image/bg/home1.png';

const TabHomeScreen = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const saveUser = async () => {
    try {
      const userData = { name, image };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const updateUser = async () => {
    try {
      const userData = { ...user, name, image };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setName('');
      setImage(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const renderButton = (onPress, text, colors = ['#8A2BE2', '#191970']) => (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderUserForm = () => (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      {renderButton(pickImage, 'Choose Profile Picture')}
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}
      {renderButton(user ? updateUser : saveUser, user ? 'Update Profile' : 'Create Profile')}
    </View>
  );

  const renderUserProfile = () => (
    <View style={styles.profile}>
      <Image source={{ uri: user.image }} style={styles.profileImage} />
      <Text style={styles.profileName}>{user.name}</Text>
      {renderButton(() => setIsEditing(true), 'Edit Profile')}
      {renderButton(deleteUser, 'Delete Profile', ['#f44336', '#d32f2f'])}
    </View>
  );

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Polish Explorer</Text>
        {user && !isEditing ? renderUserProfile() : renderUserForm()}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingTop: '20%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 22,
    paddingVertical: 10,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginTop: 10,
  },
  profile: {
    alignItems: 'center',
  },
  profileImage: {
    width:200,
    height: 200,
    borderRadius: 75,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
});

export default TabHomeScreen;
