import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, ScrollView, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Touchable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import SearchBar from '@/components/SearchBar'

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


const SearchScreen: React.FC = () => {
  const [searchData, setSearchData] = useState<Search[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigation = useNavigation();
  const defaultImage = 'https://via.placeholder.com/150'; // Default image URL

  //specific API searches
  //Nike
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const search = {
        method: 'GET',
        url: 'https://sneaker-database-stockx.p.rapidapi.com/getproducts',
        params: {
          keywords: searchQuery || 'adidas',
          limit: '10',
        },
        headers: {
          'x-rapidapi-key': 'f207a35fcfmsh575e1cc770e9063p1e6dd6jsn4bf91b482db1',
          'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(search);
        setSearchData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

    const Nike: React.FC<{ products: Search[] }> = ({ products }) => (
      <ScrollView>
        {products.map((product) => (
          <View key={product._id} style={styles.productItem}>
            <Image source={{ uri: product.thumbnail || defaultImage }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productBrand}>{product.brand}</Text>
              <Text style={styles.productTitle}>{product.shoeName}</Text>
              <Text style={styles.productGender}>{product.colorway}</Text>
              <Text style={styles.productPrice}>${product.retailPrice}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );

    const navigateToDetailPage = (id: string) => {
      // Implement navigation to the detail page
    };
  
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

  
 
  const handleCategoryPress = (category: string) => {
    
    navigation.navigate('Searches', { category });
    
  }
  

  return (
   
    <View style={styles.container}>
    <SearchBar onSearch={setSearchQuery} />

    {searchQuery === '' ? (
      <ScrollView>
      <TouchableOpacity onPress={() => handleCategoryPress('Shop all')}>
        <Text style={styles.text}>Shop all</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategoryPress('Latest release')}>
        <Text style={styles.text}>Latest release</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategoryPress('Yeezy')}>
        <Text style={styles.text}>Yeezy</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategoryPress('Adidas')}>
        <Text style={styles.text}>Adidas</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategoryPress('Jordan')}>
        <Text style={styles.text}>Jordan</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategoryPress('Nike')}>
        <Text style={styles.text}>Nike</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategoryPress('ASICS')}>
        <Text style={styles.text}>ASICS</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleCategoryPress('Apparels')}>
        <Text style={styles.text}>Apparels</Text>
      </TouchableOpacity>
    </ScrollView>
    ) : (
      <FlatList
        data={searchData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetailPage(item._id)}>
            <View style={styles.productItem}>
              <Image source={{ uri: item.thumbnail || defaultImage }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.shoeName}</Text>
                <Text style={styles.productPrice}>${item.retailPrice}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    )}
  </View>
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
    marginLeft: 10,
    marginRight: 10,
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



