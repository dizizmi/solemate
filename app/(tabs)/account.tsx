import { Image, StyleSheet, Platform } from 'react-native';


import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
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
            <ThemedText type="defaultSemiBold">insert Name</ThemedText> 
        </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">My orders</ThemedText>
        <ThemedText>
            Orders
        </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Account settings</ThemedText>
        <ThemedText>
            Details
        </ThemedText>
        </ThemedView>

        <ThemedView style={styles.logOutContainer}>
            <ThemedText type="subtitle">logout</ThemedText>
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
    marginTop: 50,
    marginBottom: 8,
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
