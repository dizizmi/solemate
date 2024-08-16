import { ThemedText } from '@/components/ThemedText';
import React, { useState } from 'react';

import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

type SizeOption = {
    value: string;
    label: string;
    available: boolean;
};

const AlertScreen: React.FC = () => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const sizes: SizeOption[] = [
        { value: 'UK 4', label: 'UK 4', available: true },
        { value: 'UK 4.5', label: 'UK 4.5', available: false },
        { value: 'UK 5', label: 'UK 5', available: false },
        { value: 'UK 5.5', label: 'UK 5.5', available: false },
        { value: 'UK 6', label: 'UK 6', available: false },
        { value: 'UK 6.5', label: 'UK 6.5', available: false },
        { value: 'UK 7', label: 'UK 7', available: false },
        { value: 'UK 7.5', label: 'UK 7.5', available: false },
        { value: 'UK 8', label: 'UK 8', available: false },
        { value: 'UK 9', label: 'UK 9', available: false },
        { value: 'UK 10', label: 'UK 10', available: true },
        { value: 'UK 11', label: 'UK 11', available: false },
    ];

    return (
      <ScrollView>
        <View style={styles.container}>
        
        <View style={styles.productPage}>
        <View style={styles.productHeader}>
          <Text style={styles.productHeaderTitle}>Carhartt x Converse Hi</Text>
          <Text style={styles.productPrice}>$195</Text>
        </View>
        </View>
        
        <View style={styles.productImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/300' }}
            style={styles.productImage}
            alt="Carhartt x Converse Hi"
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
          <ThemedText>
            Redesigned in 1922, Chuck Taylor asked the company to create a better shoe with more support and flexibility.
            After Converse added Taylor's signature to the ankle patch, they became known as Chuck Taylor All Stars.
          </ThemedText>
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
};
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


export default AlertScreen;