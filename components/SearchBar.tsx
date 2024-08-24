// SearchBar.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

type SearchBarProps = {
  placeholder?: string;
  onSearch: (text: string) => void;
};



const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search', onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text: string) => {
    setInputValue(text);
  
  };

  const handleSearchSubmit = () => {
    onSearch(inputValue);
  };
  
  return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#707070"
      value={inputValue}
      onChangeText={handleInputChange}
      onSubmitEditing={handleSearchSubmit} // Trigger search on "Enter" key press
      returnKeyType="search" // Shows "Search" on the keyboard's "Enter" key
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    borderColor: '#707070',
    borderWidth: 1,
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  displayText: {
    marginTop: 8,
    fontSize: 14,
    color: '#000',
  },
});

export default SearchBar;