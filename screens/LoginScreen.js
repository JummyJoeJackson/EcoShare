import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Basic user validation (replace with real validation)
    if (email === 'Test@example.com' && password === 'password123') {
      const userData = { name: 'John Doe', email: 'test@example.com' };

      try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        onLogin(userData);
      } catch (error) {
        console.error('Error saving user data:', error);
        Alert.alert('Error', 'Could not log you in. Please try again.');
      }
    } else {
      Alert.alert('Invalid Credentials', 'Please check your email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button color="#6D9277" title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#b7e1bf',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    borderColor: '#444243',
  },
  input: {
    borderWidth: 2,
    borderColor: '#444243',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#e0ffe0',
  },
});

export default LoginScreen;
