import React, { useState} from 'react';
import { NavigationContainer, CompositeScreenProps, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import HomeScreen from '@/app/(tabs)/index';
import DetailedItem from '@/app/(tabs)/detail';
import SearchScreen from '@/app/(tabs)/explore';
import Searches from '@/components/navigation/Searches';
import BallotScreen from '@/app/(tabs)/ballot';
import CartItem from '@/app/(tabs)/cart';
import selectedSize from '@/app/(tabs)/detail';


//maps out available routes and params
export type RootStackParamList = {
    Home: NavigatorScreenParams<HomeTabParamList>;
    DetailedItem: { product_template_id: string }; // Detail screen expects an 'id' parameter
    Ballot: undefined;
    DetailedBallot: { id: string };
    Search : undefined;
    Searches: { id : string };
    SearchScreen: { _id: string };
    Cart: undefined;
};

type DetailedItemProps = StackScreenProps<RootStackParamList, 'DetailedItem'>;


//Utility
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;


  //Tabs available at Home Route
export type HomeTabParamList = {
  Home: undefined;
  DetailedItem: { product_template_id: string };
  
};
    
export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    StackScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

  //ensures nav accesible throughout
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createStackNavigator<RootStackParamList>();

const HomeStack = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const addItemToCart = (item: CartItemType) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };
  return (
 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="DetailedItem">
          {(props) => (
            <DetailedItem
              {...props}
              cartItems={cartItems}
              addItemToCart={addItemToCart}
            />
          )}
        </Stack.Screen>
          <Stack.Screen name="Searches" component={Searches} />
          <Stack.Screen name="Ballot" component={BallotScreen} />
          <Stack.Screen name="Cart">
          {(props) => <CartItem {...props} cartItems={cartItems} />}
        </Stack.Screen>
      

        </Stack.Navigator>
      </NavigationContainer>


  );
}

export default HomeStack;