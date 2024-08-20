import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


import axios from 'axios';


type Product = {
  id: string;
  title: string;
  category: string;
  base_price: string;
  image: string;
  brand: string;
  //below isnt in the api
  model: string;
  color: string;
};

const BallotScreen: React.FC = () => {
  
  const products: Product[] = [
    {
      title: 'Air Jordan', model: '1 High OG C', color: 'Red, Black & White', base_price: '$250', image: 'https://via.placeholder.com/150',
      id: '',
      category: '',
      brand: ''
    },
    {
      title: 'Nike', model: 'Air Max 34', color: 'White', base_price: '$135', image: 'https://via.placeholder.com/150',
      id: '',
      category: '',
      brand: ''
    },
    {
      title: 'Nike', model: 'Air Force 1', color: 'White', base_price: '$89', image: 'https://via.placeholder.com/150',
      id: '',
      category: '',
      brand: ''
    },
    {
      title: 'Salomon', model: 'XT-6', color: 'Salmon', base_price: '$260', image: 'https://via.placeholder.com/150',
      id: '',
      category: '',
      brand: ''
    },
    {
      title: 'New Balance', model: '550', color: 'Black & White', base_price: '$180', image: 'https://via.placeholder.com/150',
      id: '',
      category: '',
      brand: ''
    },
    {
      title: 'Asics', model: 'Gel Lyte III', color: 'Green & White', base_price: '$110', image: 'https://via.placeholder.com/150',
      id: '',
      category: '',
      brand: ''
    },
];

  return (
    <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
            <Image
                source={require('@/assets/images/header.jpeg')}
                style={styles.headerImage}
            />
        }
      >
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>Upcoming ballots</ThemedText>

        </ThemedView>

        <ThemedView style={styles.productContainer}>
                <ScrollView>
                    {products.map((product, index) => (
                        <View key={index} style={styles.productItem}>
                            <Image source={{ uri: product.image }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productTitle}>{product.title}</Text>
                                <Text style={styles.productModel}>{product.model}</Text>
                                <Text style={styles.productColor}>{product.color}</Text>
                                <Text style={styles.productPrice}>{product.base_price}</Text>
                            </View>
                            <Text style={styles.arrow}>{'>'}</Text>
                        </View>
                    ))}
                </ScrollView>
            </ThemedView>
     

        <ThemedView style={styles.productContainer}>
          <ThemedText type="title">Popular</ThemedText>
        </ThemedView>

        <ThemedView style={styles.productContainer}>
          <ThemedText type="title">Trending</ThemedText>
        </ThemedView>

    </ParallaxScrollView>
);
};

const styles = StyleSheet.create({
  headerImage: {
    height: '100%',
    width: '100%',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
title: {
  fontSize: 20,
},

  productContainer: {
    padding: 5,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
},
  productImage: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 4,
  },
  productInfo: {
    flexGrow: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productModel: {
    fontSize: 14,
    color: '#666',
},
  productColor: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
},

  arrow: {
    fontSize: 18,
    color: '#ccc',
    marginLeft: 16,
  },
});

export default BallotScreen;