import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle user sign-up
  const handleSignUp = async () => {
    // Basic validation
    if (!name || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    // Validate email format (simple check)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Create user data object
    const userData = { name, email, password };

    try {
      // Save user data in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      Alert.alert('Sign Up Successful', 'You have successfully created an account!');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Could not sign you up. Please try again.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
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
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
