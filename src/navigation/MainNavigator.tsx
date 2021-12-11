import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductTaggingPanelScreen from '../screens/ProductTaggingPanelScreen';
import VariantScreen from '../screens/VariantScreen';
import AddProductScreen from '../screens/AddProductScreen';
import CreateProductScreen from '../screens/CreateProductScreen';

const Stack = createStackNavigator();

const TaggingPanelStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="panel"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="panel" component={ProductTaggingPanelScreen} />
      <Stack.Screen name="addProduct" component={AddProductScreen} />
      <Stack.Screen name="createProduct" component={CreateProductScreen} />
      <Stack.Screen name="variants" component={VariantScreen} />
    </Stack.Navigator>
  );
};

export default TaggingPanelStack;
