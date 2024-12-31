import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { API_URL } from '../../config';
export default function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Added state for Role
  const [cin, setCin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

   // Replace with your actual server address

  const submit = async () => {
    if (!name || !password || !role || !cin) { // Validate Role
      Alert.alert("Error", "Please enter name, password, role, and CIN.");
      return;
    }

    if (isNaN(cin)) {
      Alert.alert("Error", "CIN must be a valid number.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          password: password,
          role: role, // Include Role in request body
          cin: cin,
        }),
      });

      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json(); // Parse JSON if content type is JSON
        console.log('Employee registered:', data);
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Login');
      } else {
        const responseText = await response.text(); // Handle non-JSON response
        console.error('Unexpected server response:', responseText);
        throw new Error('Server returned non-JSON response.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        keyboardType="default"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Role</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your role"
        keyboardType="default"
        value={role}
        onChangeText={setRole}
      />

      <Text style={styles.label}>CIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your CIN"
        keyboardType="numeric"
        value={cin}
        onChangeText={setCin}
      />

      <Button
        title={isLoading ? 'Registering...' : 'Register'}
        onPress={submit}
        disabled={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
  },
});
