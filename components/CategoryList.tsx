import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './path/to/your/RootStackParamList';

type CategoryListNavigationProp = StackNavigationProp<RootStackParamList, 'Searches'>;

const CategoryList: React.FC = () => {
  const navigation = useNavigation<CategoryListNavigationProp>();

  const handleCategoryPress = (category: string) => {
    navigation.navigate('Searches', { id: category });
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#333',
  },
});

export default CategoryList;