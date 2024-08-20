// SearchBar.tsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type SearchBarProps = {
  placeholder?: string;
  onSearch: (text: string) => void;
};



const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search', onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#707070"
        onChangeText={onSearch}
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
});

export default SearchBar;