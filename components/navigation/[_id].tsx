import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const SearchDetails = () => {
    const { _id } = useLocalSearchParams();
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Search Details</Text>
          <Text style={styles.details}>Details for product ID: {_id}</Text>
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
        fontWeight: 'bold',
        marginBottom: 16,
      },
      details: {
        fontSize: 18,
        color: '#555',
      },
    });

export default SearchDetails;