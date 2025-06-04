import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmailDomain = (email) => email.endsWith('@bituin.cl');

  const handleLogin = async () => {
    if (!isValidEmailDomain(email)) {
      alert('Access restricted to @bituin.cl emails only.');
      return;
    }
    try {
      await auth().signInWithEmailAndPassword(email, password);
      alert('Login successful!');
    } catch (error) {
      alert(`Login failed: ${error.message}`);
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
      alert(`Registration failed: ${error.message}`);
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default LoginScreen;