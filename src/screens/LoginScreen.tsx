import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmailDomain = (email: string) => email.endsWith('@bituin.cl');

  const handleLogin = async () => {
    if (!isValidEmailDomain(email)) {
      alert('Access restricted to @bituin.cl emails only.');
      return;
    }
    try {
      await auth().signInWithEmailAndPassword(email, password);
      alert('Login successful!');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Login failed: ${error.message}`);
      } else {
        alert('Login failed: An unknown error occurred.');
      }
    }
  };

  const handleRegister = async () => {
    if (!isValidEmailDomain(email)) {
      alert('Access restricted to @bituin.cl emails only.');
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert('Registration successful!');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Registration failed: ${error.message}`);
      } else {
        alert('Registration failed: An unknown error occurred.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff', // Light blue background
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#ff4500', // Orange-red color for the title
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#8a2be2', // Blue-violet border color
    borderRadius: 4,
    backgroundColor: '#ffffff', // White background for input fields
    color: '#000000', // Black text color
  },
  button: {
    marginTop: 10,
    backgroundColor: '#32cd32', // Lime green button background
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#ffffff', // White text color for buttons
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;