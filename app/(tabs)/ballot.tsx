import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Link } from 'expo-router'

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


import axios from 'axios';


type Product = {
  id: string;
  title: string;
  category: string;
  base_price: number;
  image: string;
  brand: string;
  //below isnt in the api
  model: string;
  color: string;
  gender: string;
};

const BallotScreen: React.FC = () => {

  const [apiData, setApiData] = useState<Product[] | null>(null);
  const defaultImage = 'https://via.placeholder.com/150'; // Default image URL

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://stockx-api.p.rapidapi.com/product/01c1af38-d1d0-462c-aca3-13349dc893a9',
      headers: {
        'x-rapidapi-key': 'f207a35fcfmsh575e1cc770e9063p1e6dd6jsn4bf91b482db1',
        'x-rapidapi-host': 'stockx-api.p.rapidapi.com'
      }
    };
    
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setApiData([response.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const Products: React.FC<{ products: Product[] }> = ({ products }) => (
    <ScrollView>
        {products.map((product) => (
          <View key={product.id} style= {styles.productItem}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                  <ThemedText style={styles.productBrand}>{product.brand}</ThemedText>
                  <ThemedText style={styles.productTitle}>{product.title}</ThemedText>
                  <ThemedText style={styles.productGender}>{product.gender}</ThemedText>
                  <ThemedText style={styles.productPrice}>${product.base_price}</ThemedText>
                  </View>
            </View>
       
      ))}
      </ScrollView>
  );


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
        <ThemedText type="title">Ballot</ThemedText>
      </ThemedView>

      <ThemedView style={styles.productContainer}>
        
        <TouchableOpacity >
          {apiData ? (
            <Products products={apiData} />
          ) : (
            <Text>Loading...</Text>
          )}
        </TouchableOpacity>
       
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
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,

},
  productImage: {
    width: 100,
    height: 60,
    marginRight: 16,
    borderRadius: 4,
  },
  productInfo: {
    flexGrow: 1,
  },
  productBrand: {
    fontSize: 14,
    fontWeight: 'bold',

  },
  productCategory: {
    fontSize: 14,
    color: '#666',
  },
  productTitle: {
    fontSize: 14,
    color: '#666',
    marginRight: 100,
    paddingRight: 10,

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
  productGender: {
    fontSize: 14,
    color: '#aaa',
    
},

  arrow: {
    fontSize: 18,
    color: '#ccc',
    marginLeft: 16,
  },
});

export default BallotScreen;