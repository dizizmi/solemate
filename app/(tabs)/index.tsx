import { ScrollView, View, Text, Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';


type Product = {
  name: string;
  model: string;
  color: string;
  price: string;
};

const HomeScreen: React.FC = () => {
  const products: Product[] = [
      { name: 'Air Jordan', model: '1 High OG C', color: 'Red, Black & White', price: '$250' },
      { name: 'Nike', model: 'Air Max 34', color: 'White', price: '$135' },
      { name: 'Nike', model: 'Air Force 1', color: 'White', price: '$89' },
      { name: 'Salomon', model: 'XT-6', color: 'Salmon', price: '$260' },
      { name: 'New Balance', model: '550', color: 'Black & White', price: '$180' },
      { name: 'Asics', model: 'Gel Lyte III', color: 'Green & White', price: '$110' },
  ];

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#E6E5E2', dark: '#1D3D47' }}
    headerImage={
      <Image
        source={require('@/assets/images/header.jpeg')}
        style={styles.headerImage}
      />
    }
>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Latest Release</ThemedText>
        <Collapsible title="Sort By">
          <ThemedText>
            Date
          </ThemedText>
        </Collapsible>
      </ThemedView>

      <ThemedView style={styles.productContainer}>
        <ScrollView>
            {products.map((product, index) => (
                <View key={index} style={styles.productItem}>
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.productModel}>{product.model}</Text>
                        <Text style={styles.productColor}>{product.color}</Text>
                        <Text style={styles.productPrice}>{product.price}</Text>
                    </View>
                    <Text style={styles.arrow}>{'>'}</Text>
                </View>
            ))}
        </ScrollView>
      </ThemedView>
      </ParallaxScrollView>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  productContainer: {
    padding: 16,
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
  productName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
  },
  productModel: {
      fontSize: 14,
      color: '#666',
  },
  productColor: {
      fontSize: 12,
      color: '#aaa',
      marginBottom: 8,
  },
  productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
  },
  arrow: {
      fontSize: 18,
      color: '#ccc',
      marginLeft: 16,
  },

});

export default HomeScreen;