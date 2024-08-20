import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../app/(tabs)/index';
import DetailedItem from '../components/DetailedItem';


type RootStackParamList = {
  Home: undefined; // HomeScreen doesn't require params
  Detail: { id: string }; // Detail screen expects an 'id' parameter
};

const Stack = createStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailedItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;