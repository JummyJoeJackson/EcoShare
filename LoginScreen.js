import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user data exists in AsyncStorage when the app loads
  useEffect(() => {
    const checkUserLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData !== null) {
          // User data found, they are logged in
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking user login status:', error);
      }
    };

    checkUserLoginStatus();
  }, []);

  // Handle login form submission
  const handleLogin = async () => {
    // Basic user validation (you can expand this to check with a backend)
    if (email === 'test@example.com' && password === 'password123') {
      const userData = { name: 'John Doe', email: 'test@example.com' };

      try {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        Alert.alert('Login Successful', 'Welcome to the app!');
      } catch (error) {
        console.error('Error storing user data:', error);
        Alert.alert('Error', 'Could not log you in. Please try again.');
      }
    } else {
      Alert.alert('Invalid Credentials', 'Please check your email and password.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem('user');
      setIsLoggedIn(false);
      Alert.alert('Logged Out', 'You have successfully logged out.');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {isLoggedIn ? (
        <>
          <Text>Welcome, you are logged in!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

export default LoginScreen;
