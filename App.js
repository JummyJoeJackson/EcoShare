import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, TextInput, StyleSheet} from 'react-native';  // <-- Add TextInput here
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';  
import SignUpScreen from './screens/SignUpScreen';  

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [action, setAction] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const checkUserStatus = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    };
    checkUserStatus();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleSignUp = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  const addPost = () => {
    if (action.trim() !== '') {
      setPosts([...posts, { id: Date.now().toString(), text: action }]);
      setAction('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoShare</Text>
      {isLoggedIn ? (
        <>
          <Text style={styles.subtitle}>Welcome, {user.name}!</Text>
          <TextInput
            style={styles.input}
            placeholder="What eco-friendly action did you take?"
            value={action}
            onChangeText={setAction}
          />
          <Button style={styles.button} color="#6D9277" title="Share Action" onPress={addPost} />
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text style={styles.post}>{item.text}</Text>}
          />
          <Button style={styles.button} color="#6D9277" title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <LoginScreen onLogin={handleLogin} />
          <SignUpScreen onSignUp={handleSignUp} />
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
  post: {
    backgroundColor: '#e0ffe0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 2,
    marginTop: 5,
    borderColor: '#444243',
    borderWidth: 1,
  },
});
