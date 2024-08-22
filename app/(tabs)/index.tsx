import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { StackNavigationProp } from '@react-navigation/stack';


import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

//import { RootStackParamList } from '@/components/stack';

import axios from 'axios';

//type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Latest = {
  _id: string;
  shoeName: string;
  brand: string;
  retailPrice: number;
  colorway: string;
  thumbnail: string;
  releaseDate: string;
  description: string;
};

type Fight = {
  product_template_id: number;
  brand_name: string;
  color: string;
  details: string;
  main_glow_picture_url: string;
  name: string;
  single_gender: string;
  release_year: number;
  story: string;
  retail_price_cents_usd: number;

}
const HomeScreen: React.FC = () => {
  

  const [apiData, setApiData] = useState<Latest[] | null>(null);
  const [fightData, setFightData] = useState<Fight[] | null>(null);
  const defaultImage = 'https://via.placeholder.com/150'; // Default image URL

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://sneaker-database-stockx.p.rapidapi.com/mostpopular',
      params: {limit: '10'},
      headers: {
        'x-rapidapi-key': 'f207a35fcfmsh575e1cc770e9063p1e6dd6jsn4bf91b482db1',
        'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com'
      }
    };

    const optionsFight = {
      method: 'GET',
      url: 'https://sneaker-database-stockx.p.rapidapi.com/fightclub-releases',
      params: {hitsPerPage: '6'},
      headers: {
        'x-rapidapi-key': 'f207a35fcfmsh575e1cc770e9063p1e6dd6jsn4bf91b482db1',
        'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com'
      }
    };
    
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setApiData(response.data);
        const responseFight = await axios.request(optionsFight);
  
        setFightData(responseFight.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const Products: React.FC<{ products: Latest[] }> = ({ products }) => (
    <ScrollView horizontal>
      {products.map((product) => (
          <View key={product._id} style={styles.card}>
            <Text style={styles.productBrand}>{product.releaseDate}</Text>
            <Image
              source={{ uri: product.thumbnail || defaultImage }}
              style={styles.image}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{product.brand}</Text>
              <Text style={styles.productBrand} numberOfLines={1} >{product.shoeName}</Text>
              <Text style={styles.productColor} numberOfLines={1}>{product.colorway}</Text>
              <Text style={styles.productPrice}>${product.retailPrice}</Text>
          </View>
        </View>
      
      ))}
    </ScrollView>
  );

  const Fights: React.FC<{ fights: Fight[] }> = ({ fights }) => (
    <ScrollView horizontal>
      {Array.isArray(fights) && fights.length > 0 ? (
        fights.map((fight, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.productBrand}>{fight.release_year}</Text>
            <Image
              source={{ uri: fight.main_glow_picture_url || defaultImage }}
              style={styles.image}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{fight.brand_name}</Text>
              <Text style={styles.productBrand} numberOfLines={1}>
                {fight.name}
              </Text>
              <Text style={styles.productColor} numberOfLines={1}>
                {fight.color}
              </Text>
              <Text style={styles.productPrice}>
                ${fight.retail_price_cents_usd / 100}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text>No fight club releases available</Text>
      )}
    </ScrollView>
  );
  

  return (
    <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
            <Image
                source={require('@/assets/images/header.png')}
                style={styles.headerImage}
            />
          }
        >

      <ThemedView style={styles.productContainer}>
        <ThemedText type="title">Latest Release
        </ThemedText>
      </ThemedView>
      
        <ThemedView style={styles.productContainer}>
          <ThemedText type="subtitle">StockX</ThemedText>
          <ScrollView horizontal>
              <TouchableOpacity >
                {apiData ? (
                  <Products products={apiData} />
                ) : (
                  <Text>Loading...</Text>
                )}
              </TouchableOpacity>
          
        </ScrollView>
        </ThemedView> 

      <ThemedView style={styles.productContainer}>
        <ThemedText type="subtitle">FightClub </ThemedText>

        <ThemedView style={styles.productContainer}>
            <ScrollView horizontal>
                <TouchableOpacity >
                  {fightData ? (
                    <Fights fights={fightData} />
                  ) : (
                    <Text>Loading...</Text>
                  )}  
                
                </TouchableOpacity>
            </ScrollView>
        </ThemedView>
      </ThemedView>

    
    </ParallaxScrollView>


);
};

const styles = StyleSheet.create({
  headerImage: {
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 10,
  },
  productContainer: {
    padding: 2
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 12,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
  card: {
    width: 150,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  image: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },

});

export default HomeScreen;



{/* <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Products</ThemedText>
        </ThemedView>

        {/* <ThemedView style={styles.productContainer}>
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
            </ThemedView> */}
     

             {/* <ThemedView style={styles.productContainer}>
          <ThemedText type="title">Collabs</ThemedText>
          <ScrollView horizontal>
          {collabs.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Detail', { id: item.id })}>
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text>{item.name}</Text>
                <Text>{item.color}</Text>
                <Text>Rating: {item.rating} ★</Text>
                <Text>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </ThemedView> */}