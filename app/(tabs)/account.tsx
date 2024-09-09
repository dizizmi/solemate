import React , { useState } from 'react';
import { Image, StyleSheet, Text, Alert, View, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { supabase } from '@/supabaseClient';


const ProfileScreen = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: username,  // Using username as email for simplicity
        password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
      } else {
        Alert.alert('Login Successful', `Welcome, ${username}!`);
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

   // Handle Sign Up with Supabase
   const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username, // Attach username to the user metadata
          },
        },
      });

      if (error) {
        Alert.alert('Sign Up Failed', error.message);
      } else {
        Alert.alert('Account Created', `Welcome, ${username}!`);
      }
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    }
  };
 
  return (
    <View style={styles.container}>
    {/* Title */}
    <Text style={styles.title}>{isLogin ? 'Login' : 'Create Account'}</Text>

    {/* Username Input (for Sign-Up) */}
    {!isLogin && (
      <>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
      </>
    )}

    {/* Email Input */}
    <Text style={styles.label}>Email</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your email"
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
      keyboardType="email-address"
    />

    {/* Password Input */}
    <Text style={styles.label}>Password</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />

    {/* Login or Create Account Button */}
    <TouchableOpacity
      style={styles.authButton}
      onPress={isLogin ? handleLogin : handleSignUp}
    >
      <Text style={styles.authButtonText}>{isLogin ? 'Login' : 'Create Account'}</Text>
    </TouchableOpacity>

    {/* Toggle between Login and Create Account */}
    <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
      <Text style={styles.toggleText}>
        {isLogin ? 'Don’t have an account? Create one' : 'Already have an account? Login'}
      </Text>
    </TouchableOpacity>

      {/* Social Login Options */}
      <Text style={styles.socialText}>Or create account</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialIcon}>
        <Ionicons name="logo-google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
        <Ionicons name="logo-facebook" size={24} color="black" />
        </TouchableOpacity>
        {/* Add more OAuth providers if needed */}
      </View>

      {/* Continue as Guest */}
      <TouchableOpacity>
        <Text style={styles.guestText}>Or continue as guest</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f4f1eb',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#2b2fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#2b2fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
  },
  guestText: {
    textAlign: 'center',
    color: '#2b2fff',
  },
  authButton: {
    backgroundColor: '#2b2fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  authButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#2b2fff',
    textAlign: 'center',
    marginBottom: 20,
  },
});