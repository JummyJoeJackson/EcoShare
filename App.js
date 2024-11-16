import {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, TextInput, StyleSheet, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';  
import SignUpScreen from './screens/SignUpScreen';  

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [action, setAction] = useState('');
  const [posts, setPosts] = useState([]);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const checkUserStatus = async () => {
      const storedUser = await AsyncStorage.getItem('currentUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    };
    checkUserStatus();
  }, []);

  const handleLogin = async (email, password) => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const existingUser = users.find(user => user.email === email && user.password === password);

    if (existingUser) {
      setUser(existingUser);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('currentUser', JSON.stringify(existingUser));
    } else {
      Alert.alert('Invalid Credentials', 'The email or password is incorrect.');
    }
  };

  const handleSignUp = async (userData) => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const userExists = users.some(user => user.email === userData.email);
    if (userExists) {
      Alert.alert('User Exists', 'An account with this email already exists.');
      return;
    }

    users.push(userData);
    try {
      await AsyncStorage.setItem('users', JSON.stringify(users));
      setUser(userData);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Could not sign you up. Please try again.');
    }
  };

  const handleLogout = async () => {
    // TESTING PURPOSES ONLY!
    // await AsyncStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
  };

  const addPost = () => {
    if (action.trim() !== '') {
      setPosts([...posts, {id:Date.now().toString(), text:action, image: imageUri, posterName: user.name,}]);
      setAction('');
      setImageUri(null);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access the media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0]?.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoShare</Text>
      {isLoggedIn ? (
        <>
          <Text style={styles.subtitle}>Welcome, {user.name}!</Text>
          <TextInput style={styles.input} placeholder="What eco-friendly action did you take?" value={action} onChangeText={setAction}/>
          <View style={styles.button}>
            <Button color="#6D9277" title="Add a Photo" onPress={pickImage}/>
          </View>
          <View style={styles.button}>
            <Button color="#6D9277" title="Share Action" onPress={addPost}/>
          </View>
          <FlatList data={posts} keyExtractor={(item) => item.id} renderItem={({ item }) => (
              <View style={styles.post}>
                {item.image && (<Image source={{uri: item.image}} style={styles.postImage}/>)}
                <Text style={styles.posterName}>{item.posterName}</Text>
                <Text style={styles.postText}>{item.text}</Text>
              </View>
          )}/>
          <View style={styles.button}>
            <Button style={styles.button} color="#6D9277" title="Logout" onPress={handleLogout}/>
          </View>
        </>
      ) : (
        <>
          <LoginScreen onLogin={handleLogin}/>
          <SignUpScreen onSignUp={handleSignUp}/>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 55,
    alignText: 'center',
    fontSize: 50,
    backgroundColor: '#B7E1BF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    borderColor: '#444243',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#e0ffe0',
    borderColor: '#444243',
  },
  button: {
    padding: 2,
    marginBottom: 2,
  },
  post: {
    backgroundColor: '#e0ffe0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 2,
    marginTop: 5,
    borderColor: '#444243',
    borderWidth: 2,
  },
  posterName: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
    color: '#4d4d4d',
  },
  postText: {
    backgroundColor: '#e0ffe0',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    borderColor: '#444243',
    borderWidth: 1,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    borderWidth: 1,
  },
});
