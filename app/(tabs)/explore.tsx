import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, ScrollView, View, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SearchBar from '@/components/SearchBar';
import findSneakers from '@/app/api/findSneaker';

type Product = {
  id: string;
  title: string;
  link: string;
  description: string | null;
  category: string;
  image: string;
  gtin: string;
  brand: string;
  gender: string;
  age_group: string;
  base_price: number;
  currency: string;
};


const SearchScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
          <Text style={styles.text}>Collabs</Text>
          <Text style={styles.text}>Brands</Text>
          <Text style={styles.text}>Style</Text>
          <Text style={styles.text}>Activity</Text>
          <Text style={styles.text}>Trending</Text>
          <Text style={styles.text}>Accessories</Text>
          <Text style={styles.text}>Sale</Text>
          <Text style={styles.text}>Features</Text>
        </ScrollView>
      ) : products.length === 0 ? (
        <View style={styles.noProductContainer}>
          <Text style={styles.noProductText}>No shoes available</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToDetailPage(item.id)}>
              <View style={styles.productItem}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.base_price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const navigateToDetailPage = (productId: string) => {
  navigation.navigate('DetailedItem', { id: productId });
};



const styles = StyleSheet.create({
 
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
  productItem: {
    padding: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  productImage: {
    width: 50, 
    height: 50, 
    marginRight: 16
  },
  productTitle: {
    fontSize: 16
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
