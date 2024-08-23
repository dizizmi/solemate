import { ThemedText } from '@/components/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import type { HomeTabScreenProps } from '@/components/navigation/stack';

import axios from 'axios';

type selectedSize = {
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
  //additional for detailed page
  size_us_men: number | null;
  size_us_women: number | null;
  size_us_youth: number | null;
  lowest_price_cents_usd: number;
  story_html: string;
  has_stock: boolean;
};

type SizeOption = {
  value: string;
  label: string;
  available: boolean;
};




const DetailedItem = ({ navigation, route }: HomeTabScreenProps<'DetailedItem'>) => {
  

  const [fetchedData, setFetchedData] = useState<selectedSize | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  useEffect(() => {

    const optionsFight = {
      method: 'GET',
      url: 'https://sneaker-database-stockx.p.rapidapi.com/fightclubonly',
      params: {
        query: 'nike',
        hitsPerPage: '1'
      },
      headers: {
        'x-rapidapi-key': 'f207a35fcfmsh575e1cc770e9063p1e6dd6jsn4bf91b482db1',
        'x-rapidapi-host': 'sneaker-database-stockx.p.rapidapi.com'
      }
    };
    
    const fetchData = async () => {
      try {
        const responseFight = await axios.request(optionsFight);
        setFetchedData(responseFight.data.products[0]);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!fetchedData) {
    return <Text>Loading...</Text>;
  }

  const sizes: SizeOption[] = [
    { value: 'US 4', label: 'US 4', available: fetchedData.size_us_men === 4 && fetchedData.has_stock },
    { value: 'US 4.5', label: 'US 4.5', available: fetchedData.size_us_men === 4.5 && fetchedData.has_stock },
    { value: 'US 5', label: 'US 5', available: fetchedData.size_us_men === 5 && fetchedData.has_stock },
    { value: 'US 5.5', label: 'US 5.5', available: fetchedData.size_us_men === 5.5 && fetchedData.has_stock },
    { value: 'US 6', label: 'US 6', available: fetchedData.size_us_men === 6 && fetchedData.has_stock },
    { value: 'US 6.5', label: 'US 6.5', available: fetchedData.size_us_men === 6.5 && fetchedData.has_stock },
    { value: 'US 7', label: 'US 7', available: fetchedData.size_us_men === 7 && fetchedData.has_stock },
    { value: 'US 7.5', label: 'US 7.5', available: fetchedData.size_us_men === 7.5 && fetchedData.has_stock },
    { value: 'US 8', label: 'US 8', available: fetchedData.size_us_men === 8 && fetchedData.has_stock },
    { value: 'US 9', label: 'US 9', available: fetchedData.size_us_men === 9 && fetchedData.has_stock },
    { value: 'US 10', label: 'US 10', available: fetchedData.size_us_men === 10 && fetchedData.has_stock },
    { value: 'US 11', label: 'US 11', available: fetchedData.size_us_men === 11 && fetchedData.has_stock },
  ];

  

  return (
    
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.productPage}>
        <View style={styles.productHeader}>
        
          <Text style={styles.productHeaderTitle}>{fetchedData.release_year}  {fetchedData.name}</Text>

        </View>
          <Text style={styles.productPrice}>
            ${fetchedData.retail_price_cents_usd / 100}
            <Text style= {styles.lowPrice}>
            <Ionicons name="arrow-down-outline" size={25} color="red" />
            ${fetchedData.lowest_price_cents_usd / 100}
          </Text>
        </Text>
     
        <View style={styles.productImageContainer}>
          <Image
            source={{ uri: fetchedData.main_glow_picture_url }}
            style={styles.productImage}
            alt={fetchedData.name}
          />
        </View>

        <View style={styles.productSizes}>
          <Text style={styles.sizeLabel}>SIZE:</Text>
          <View style={styles.sizeOptions}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size.value}
                disabled={!size.available}
                style={[
                  styles.sizeOption,
                  !size.available && styles.sizeOptionUnavailable,
                  selectedSize === size.value && styles.sizeOptionSelected,
                ]}
                onPress={() => setSelectedSize(size.value)}
              >
                <Text>{size.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.sizeNotAvailable}>
            <Text style={styles.sizeNotAvailableLink}>
              Your size not available?
            </Text>
          </View>
        </View>

        <View style={styles.productDescription}>
          <ThemedText>{fetchedData.story_html}</ThemedText>
          <Text>{}</Text>
        </View>

        <View style={styles.productActions}>
          <TouchableOpacity style={styles.quickCheckout}>
            <Text>Quick check out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wishlist}>
          <Ionicons name="heart-outline" size={24} color="#5139FF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },

  productPage: {
    padding: 16,

  },
  
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
  },

  productHeaderTitle: {
    fontSize: 24,
    marginLeft: 10,
    marginTop: 10,
    
  },

  productPrice: {
    fontSize: 20,
    color: '#333',
    marginLeft: 10,
    
  },

  lowPrice : {
    fontSize: 20,
    color: 'red',
  },

  productImageContainer: {
    justifyContent: 'center',
    alignItems: 'center', // Centering image horizontally
    marginBottom: 5,

   
  },

  productImage: {
    width: 300,
    height: 300, // Fixed height to maintain aspect ratio
    resizeMode: 'contain', // Ensure the image scales properly
  },

  productSizes: {
    padding: 20
  },

  sizeLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },

  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 2

  },

  sizeOption: {
    width: 65,
    height: 40,
    margin: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    shadowColor: 'purple',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },

  sizeOptionSelected: {
    backgroundColor: '#007bff',
    color: '#fff',
  },

  sizeOptionUnavailable: {
    backgroundColor: '#eee',
    color: '#999',
    
  },

  sizeNotAvailable: {
    marginTop: 8,
  },

  sizeNotAvailableLink: {
    color: '#007bff',
    textDecorationLine: 'underline',
    
  },

  productDescription: {
    padding: 20,
    marginBottom: 16,
  },

  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  quickCheckout: {
    flexGrow: 1,
    padding: 10,
    marginRight: 8,
    marginLeft: 10,
    marginBottom: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',


  },

  wishlist: {
    padding: 10,
    marginRight: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DetailedItem;