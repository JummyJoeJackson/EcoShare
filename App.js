import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [action, setAction] = useState('');
  const [posts, setPosts] = useState([]);

  const addPost = () => {
    if (action.trim() !== '') {
      setPosts([...posts, { id: Date.now().toString(), text: action }]);
      setAction('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eco-Friendly Actions</Text>
      <TextInput
        style={styles.input}
        placeholder="What eco-friendly action did you take?"
        value={action}
        onChangeText={setAction}
      />
      <Button title="Share Action" onPress={addPost} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.post}>{item.text}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  post: {
    backgroundColor: '#e0ffe0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
});

