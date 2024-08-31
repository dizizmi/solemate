import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const ProfileScreen = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Account</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">hello</ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">name id</ThemedText>
        </ThemedText>
          <Text>emailid</Text>
          
          <Text>
          <Ionicons name="heart-outline" size={15} color="purple" />  
           View Liked </Text>
          </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Orders</ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">My orders</ThemedText>
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Account Settings</ThemedText>
          <ThemedText type="defaultSemiBold">Details</ThemedText>
          <ThemedText type="defaultSemiBold">Forgot password?  </ThemedText>
          <ThemedText type="defaultSemiBold">Details </ThemedText>
      </ThemedView> 

      <ThemedView style={styles.logOutContainer}>
        <ThemedText type="subtitle">Log out</ThemedText>
        <ThemedText>Do you have an account? Log in</ThemedText>
        
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logOutContainer: {
    gap: 8,
    marginTop: 20,
    marginBottom: 8,
    alignItems: 'center',
  },
  socialLoginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

export default ProfileScreen;