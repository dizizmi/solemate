import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { RootStackParamList } from '@/components/stack';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

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

type latestRelease = {
  id: string;
  title: string;
  color: string;
  price: string;
  image: string;
};

const HomeScreen = ({ }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('https://stockx-api.p.rapidapi.com/product/01c1af38-d1d0-462c-aca3-13349dc893a9');
        
  //       // Mapping the response to match the Product type
  //       const fetchedProducts: Product[] = response.data.map((item: any) => ({
  //         id: item.id,
  //         title: item.title,
  //         category: item.category,
  //         base_price: `${item.currency} ${item.base_price}`, // Concatenate currency and price
  //         image: item.image,
  //         brand: item.brand,
  //       }));
        
  //       setProducts(fetchedProducts);
  //     } catch (error) {
  //       setError('Failed to load products');
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // if (loading) {
  //     return (
  //         <View style={styles.loaderContainer}>
  //             <ActivityIndicator size="large" color="#0000ff" />
  //         </View>
  //     );
  // }

  // if (error) {
  //     return (
  //         <View style={styles.errorContainer}>
  //             <Text style={styles.errorText}>{error}</Text>
  //         </View>
  //     );
  // }

  
  
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

  const latestRelease = [
    { id: '4', title: 'Air Jordan 1 High', color: 'Red, Black & White', price: '$200', image: 'https://via.placeholder.com/150' },
    { id: '5',title: 'Nike Air Max 34', color: 'White', price: '$195', image: 'https://via.placeholder.com/150' },
    { id: '6', title: 'Nike Air Force 1', color: 'White', price: '$100', image: 'https://via.placeholder.com/150' },
  ];

  const collabs = [
    { id: '7', name: 'MSCF x Lil Nas', color: 'Red, Black & White', price: '$859', rating: 4.5, image: 'https://via.placeholder.com/150' },
    { id: '8', name: 'Carhartt x Conv', color: 'Tan', price: '$195', rating: 4.3, image: 'https://via.placeholder.com/150' },
    { id: '9', name: 'Raf Sim x Adidas', color: 'Cool Gel', price: '$265', rating: 4.8, image: 'https://via.placeholder.com/150' },
  ];


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
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Products</ThemedText>
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
          <ThemedText type="title">Latest Release</ThemedText>
          <ScrollView horizontal>
          {latestRelease.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Detail', { id: item.id })}>
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text>{item.title}</Text>
                <Text>{item.color}</Text>
                <Text>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </ThemedView>

        <ThemedView style={styles.productContainer}>
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