import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, ScrollView, View, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';


import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


import axios from 'axios';


type Search = {
  _id: string;
  shoeName: string;
  brand: string;
  retailPrice: number;
  colorway: string;
  thumbnail: string;
  releaseDate: string;
  description: string;

}



const SearchScreen: React.FC= () => {
  const [searchData, setSearchData] = useState<Search[] | null>(null);
  const defaultImage = 'https://via.placeholder.com/150'; // Default image URL


  //specific API searches
  //Nike
  useEffect(() => {
    const search = {
      method: 'GET',
      url: 'https://sneaker-database-stockx.p.rapidapi.com/getproducts',
      params: {
        keywords: 'adidas',
        limit: '10'
      },
      headers: {
        'x-rapidapi-key': 'f207a35fcfmsh575e1cc770e9063p1e6dd6jsn4bf91b482db1',
        'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com'
      }
    };
    
  
    
    const fetchData = async () => {
      try {
        const response = await axios.request(search);
        setSearchData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  const Nike: React.FC<{ products: Search[] }> = ({ products }) => (
    <ScrollView>
        {products.map((product) => (
          <View key={product._id} style= {styles.productItem}>
              <Image source={{ uri: product.thumbnail || defaultImage }} style={styles.productImage} />
              <View style={styles.productInfo}>
                  <ThemedText style={styles.productBrand}>{product.brand}</ThemedText>
                  <ThemedText style={styles.productTitle}>{product.shoeName}</ThemedText>
                  <ThemedText style={styles.productGender}>{product.colorway}</ThemedText>
                  <ThemedText style={styles.productPrice}>${product.retailPrice}</ThemedText>
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
      <View>
        <TouchableOpacity>
        <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
      </View>
  
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"> Adidas </ThemedText>
      </ThemedView>

      <ThemedView style={styles.productContainer}>
        {searchData ? (
          <Nike products={searchData} />
        ) : (
          <Text>Loading...</Text>
        )}
      </ThemedView>


      <ThemedView style={styles.productContainer}>
        <ThemedText type="title">Trending</ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  );

  
}


const styles = StyleSheet.create({
  headerImage: {
    height: '100%',
    width: '100%',
  },
 
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    paddingVertical: 10,
    margin: 10,
    paddingLeft: 20
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
    padding: 2,
    
  },
  
  //Each product item
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
  productTitle: {
    fontSize: 16,
    marginRight: 150,
  },
  productInfo: {
    flexGrow: 1,
  },
  productBrand: {
    fontSize: 14,
    fontWeight: 'bold',

  },
  productGender: {
    fontSize: 14,
    color: '#aaa',
    marginRight: 120,
    
},
  productImage: {
    width: 100, 
    height: 60, 
    marginRight: 16
  },
 
  productPrice: { 
    fontSize: 14, 
    color: '#888' 
  },


  noProductContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  noProductText: { 
    fontSize: 18, 
    color: '#888' 
  },

  container: {
    flex: 1,
    marginTop: 90,
  },
  categoriesContainer: {
    marginTop: 16,
  },
  category: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  sale: {
    color: 'red',
  },
});

export default SearchScreen;


/* const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (searchQuery) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const result = await findSneakers(searchQuery);
          setProducts(result);
        } catch (error) {
          setError('Failed to load products');
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    } else {
      setLoading(false); // No need to fetch when search is empty
    }
  }, [searchQuery]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  } 

  return (
  
      <View style={styles.container}>
         <SearchBar onSearch={setSearchQuery} />

      {searchQuery === '' ? (
        <ScrollView>
          <Text style={styles.text}>Shop all</Text>
          <Text style={styles.text}>Upcoming ballot</Text>
          <Text style={styles.text}>Latest release</Text>
          <Text style={styles.text}>Yeezy</Text>
          <Text style={styles.text}>Adidas</Text>
          <Text style={styles.text}>Jordan</Text>
          <Text style={styles.text}>Nike</Text>
          <Text style={styles.text}>ASICS</Text>
          <Text style={styles.text}>Apparels</Text>
          
        </ScrollView>
      ) : 
      ) 
      </View>
    }*/



