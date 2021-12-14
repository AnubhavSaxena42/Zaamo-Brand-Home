import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductTaggingPanelScreen from '../screens/ProductTaggingPanelScreen';
import VariantScreen from '../screens/VariantScreen';
import AddProductScreen from '../screens/AddProductScreen';
import CreateProductScreen from '../screens/CreateProductScreen';
import MobileOTPScreen from '../screens/MobileOTPScreen/MobileOTPScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen/VerifyOTPScreen';
import ConnectInstaScreen from '../screens/ConnectInstaScreen/ConnectInstaScreen';
import LoginSuccessScreen from '../screens/LoginSuccessScreen/LoginSuccessScreen';
const TaggingStack = createStackNavigator();
const AuthStack = createStackNavigator();

export const AuthorizationStack = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="MobileOTPScreen" component={MobileOTPScreen} />
      <AuthStack.Screen name="VerifyOTPScreen" component={VerifyOTPScreen} />
      <AuthStack.Screen
        name="ConnectInstaScreen"
        component={ConnectInstaScreen}
      />
      <AuthStack.Screen
        name="LoginSuccessScreen"
        component={LoginSuccessScreen}
      />
    </AuthStack.Navigator>
  );
};

const TaggingPanelStack = () => {
  return (
    <TaggingStack.Navigator
      initialRouteName="panel"
      screenOptions={{
        headerShown: false,
      }}>
      <TaggingStack.Screen name="panel" component={ProductTaggingPanelScreen} />
      <TaggingStack.Screen name="addProduct" component={AddProductScreen} />
      <TaggingStack.Screen
        name="createProduct"
        component={CreateProductScreen}
      />
      <TaggingStack.Screen name="variants" component={VariantScreen} />
    </TaggingStack.Navigator>
  );
};

export default TaggingPanelStack;
