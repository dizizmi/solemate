
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';


import axios from 'axios';


type Product = {
  id: string;
  title: string;
  link: string; // Added 'link' field from the API
  description: string | null; // The description can be null based on the API response
  category: string;
  image: string;
  gtin: string;
  brand: string;
  gender: string;
  age_group: string;
  base_price: number;
  currency: string;
  variants: SizeOption[]; // Array of SizeOptions to represent available sizes
  labels: string[]; // Array of strings for labels like "sneakers", "adidas Forum", etc.
  
  // Additional fields not in the API
  model: string; 
  color: string; 
};

type SizeOption = {
    size: string; // Size of the shoe, e.g., "5.5"
    price: number; // Price corresponding to that size
    currency: string; // Currency for the price, e.g., "USD"
  };

  const DetailedBallot: React.FC = () => {
    const [apiData, setApiData] = useState<Product[] | null>(null);
    const defaultImage = 'https://via.placeholder.com/150'; // Default image URL
   
   //const { id } = route.params;
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

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
      },[]);

    
    const Products: React.FC<{ product: Product }> = ({ product }) => (
    <ScrollView>
    <View style={styles.productPage}>
        <View style={styles.productHeader}>
        <Text style={styles.productHeaderTitle} numberOfLines={1} ellipsizeMode="tail">
            {product.title}
        </Text>
        <Text style={styles.productPrice}>${product.base_price}</Text>
        </View>

        <View style={styles.productImageContainer}>
        <Image
            source={{ uri: product.image || defaultImage }}
            style={styles.productImage}
            alt={product.title}
        />
        </View>

        <View style={styles.productSizes}>
        <Text style={styles.sizeLabel}>SIZE :</Text>
        <View style={styles.sizeOptions}>
            {product.variants.map((variant) => (
            <TouchableOpacity
                key={variant.size}
                style={[
                styles.sizeOption,
                selectedSize === variant.size && styles.sizeOptionSelected
                ]}
                onPress={() => setSelectedSize(variant.size)}
            >
                <Text>{variant.size}</Text>
                <Text>${variant.price}</Text>
            </TouchableOpacity>
            ))}
        </View>
        <View style={styles.sizeNotAvailable}>
            <Text style={styles.sizeNotAvailableLink}>Your size not available?</Text>
        </View>
        </View>

        <View style={styles.productDescription}>
        <Text>{product.description || 'No description available'}</Text>
        </View>

        <View style={styles.productActions}>
        <TouchableOpacity style={styles.quickCheckout}>
            <Text>Quick check out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wishlist}>
            <Text>❤️</Text>
        </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
    );
    

    
    return (
        <ScrollView>
        <View style={styles.container}>
          {apiData ? (
            <Products product={apiData[0]} />
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </ScrollView>
    );
  };
            {/* Commenting out the code below */}
            {/* <View style={styles.container}>
                <View style={styles.productPage}>
                    <View style={styles.productHeader}>
                        <Text style={styles.productHeaderTitle}>{itemDetails.title}</Text>
                        <Text style={styles.productPrice}>{itemDetails.price}</Text>
                    </View>
                </View>

                <View style={styles.productImageContainer}>
                    <Image
                        source={{ uri: itemDetails.image }}
                        style={styles.productImage}
                        alt={itemDetails.title}
                    />
                </View>

                <View style={styles.productSizes}>
                    <Text style={styles.sizeLabel}>SIZE :</Text>
                    <View style={styles.sizeOptions}>
                        {sizes.map((size) => (
                            <TouchableOpacity
                                key={size.value}
                                disabled={!size.available}
                                style={[
                                    styles.sizeOption,
                                    !size.available && styles.sizeOptionUnavailable,
                                    selectedSize === size.value && styles.sizeOptionSelected
                                ]}
                                onPress={() => setSelectedSize(size.value)}
                            >
                                <Text>{size.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.sizeNotAvailable}>
                        <Text style={styles.sizeNotAvailableLink}>Your size not available?</Text>
                    </View>
                </View>

                <View style={styles.productDescription}>
                    <ThemedText>{itemDetails.description}</ThemedText>
                </View>

                <View style={styles.productActions}>
                    <TouchableOpacity style={styles.quickCheckout}>
                        <Text>Quick check out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wishlist}>
                        <Text>❤️</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
   
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
    marginBottom: 16,
  },

  productHeaderTitle: {
    fontSize: 24,
    margin: 0,
  },

  productPrice: {
    fontSize: 20,
    color: '#333',
  },

  productImageContainer: {
    justifyContent: 'center',
    alignItems: 'center', // Centering image horizontally
    marginBottom: 20,
   
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
  },

  sizeOption: {
    width: 60,
    height: 40,
    margin: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
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

export default DetailedBallot;