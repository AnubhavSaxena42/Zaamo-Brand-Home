import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductTaggingPanelScreen from '../screens/ProductTaggingPanelScreen';
import VariantScreen from '../screens/VariantScreen';
import AddProductScreen from '../screens/AddProductScreen';
import CreateProductScreen from '../screens/CreateProductScreen';
import MobileOTPScreen from '../screens/MobileOTPScreen/MobileOTPScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen/VerifyOTPScreen';
import ConnectInstaScreen from '../screens/ConnectInstaScreen/ConnectInstaScreen';
import LoginSuccessScreen from '../screens/LoginSuccessScreen/LoginSuccessScreen';
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen';
import OrdersScreen from '../screens/OrdersScreen/OrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen/OrderDetailsScreen';
const TaggingStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const OrderStack = createStackNavigator();
const ProductStack = createStackNavigator();
const MarketingStack = createStackNavigator();
const StoreStack = createStackNavigator();
const HomeTabs = createBottomTabNavigator();
export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} />
    </HomeStack.Navigator>
  );
};
export const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator screenOptions={{headerShown: false}}>
      <OrderStack.Screen name="OrdersScreen" component={OrdersScreen} />
      <OrderStack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
      />
    </OrderStack.Navigator>
  );
};
export const HomeTabNavigator = () => {
  return (
    <HomeTabs.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
      }}>
      <HomeTabs.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: focused => (
            <Entypo name="home" size={25} color={focused ? 'black' : 'gray'} />
          ),
        }}
      />
      <HomeTabs.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          tabBarIcon: focused => (
            <Ionicons
              name="reorder-three"
              size={25}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="Products"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: focused => (
            <Entypo
              name="price-tag"
              size={25}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="Marketing"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: focused => (
            <Entypo
              name="line-graph"
              size={25}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="Store"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: focused => (
            <Fontisto
              name="shopping-store"
              size={25}
              color={focused ? 'black' : 'gray'}
            />
          ),
        }}
      />
    </HomeTabs.Navigator>
  );
};

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
