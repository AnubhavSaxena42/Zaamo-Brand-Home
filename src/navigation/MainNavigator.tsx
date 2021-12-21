import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductTaggingPanelScreen from '../screens/ProductTaggingPanelScreen';
import VariantScreen from '../screens/VariantScreen';
import AddProductScreen from '../screens/AddProductScreen';
import CreateProductScreen from '../screens/CreateProductScreen';
import SelectBrandsScreen from '../screens/SelectBrandsScreen/SelectBrandsScreen';
const Stack = createStackNavigator();

const TaggingPanelStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectBrandsScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SelectBrandsScreen" component={SelectBrandsScreen} />
      <Stack.Screen name="panel" component={ProductTaggingPanelScreen} />
      <Stack.Screen name="addProduct" component={AddProductScreen} />
      <Stack.Screen name="createProduct" component={CreateProductScreen} />
      <Stack.Screen name="variants" component={VariantScreen} />
    </Stack.Navigator>
  );
};

export default TaggingPanelStack;
