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
import ProductsTabScreen from '../screens/ProductsTabScreen/ProductsTabScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import MarketingScreen from '../screens/MarketingScreen/MarketingScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import InstaWorldScreen from '../screens/InstaWorldScreen/InstaWorldScreen';
import ConnectMySocialScreen from '../screens/ConnectMySocialScreen/ConnectMySocialScreen';
import LogisticsSettingsScreen from '../screens/LogisticsSettingsScreen/LogisticsSettingsScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen/TermsAndConditionsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen/PrivacyPolicyScreen';
import ReturnPolicyScreen from '../screens/ReturnPolicyScreen/ReturnPolicyScreen';
import StoreThemesScreen from '../screens/StoreThemesScreen/StoreThemesScreen';
import BrandGuidelinesScreen from '../screens/BrandGuidelinesScreen/BrandGuidelinesScreen';
import RegisterAsCompanyScreen from '../screens/RegisterAsCompanyScreen/RegisterAsCompanyScreen';
import PaymentDetailsScreen from '../screens/PaymentDetailsScreen/PaymentDetailsScreen';
import ZaamoSupportScreen from '../screens/ZaamoSupportScreen/ZaamoSupportScreen';
import CustomiseLandingPageScreen from '../screens/CustomiseLandingPageScreen/CustomiseLandingPageScreen';
import CouponInfoScreen from '../screens/CouponInfoScreen/CouponInfoScreen';
const TaggingStack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const OrderStack = createStackNavigator();
const ProductStack = createStackNavigator();
const MarketingStack = createStackNavigator();
const StoreStack = createStackNavigator();
const MainStack = createStackNavigator();
const HomeTabs = createBottomTabNavigator();
export const MarketingStackNavigator = () => {
  return (
    <MarketingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MarketingStack.Screen
        name="CouponInfoScreen"
        component={CouponInfoScreen}
      />
      <MarketingStack.Screen
        name="MarketingScreen"
        component={MarketingScreen}
      />
    </MarketingStack.Navigator>
  );
};
export const StoreStackNavigator = () => {
  return (
    <StoreStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <StoreStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <StoreStack.Screen
        name="StoreThemesScreen"
        component={StoreThemesScreen}
      />
      <StoreStack.Screen
        name="ReturnPolicyScreen"
        component={ReturnPolicyScreen}
      />
      <StoreStack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />
      <StoreStack.Screen
        name="ConnectMySocialScreen"
        component={ConnectMySocialScreen}
      />
      <StoreStack.Screen
        name="BrandGuidelinesScreen"
        component={BrandGuidelinesScreen}
      />
      <StoreStack.Screen
        name="CustomiseLandingPageScreen"
        component={CustomiseLandingPageScreen}
      />
      <StoreStack.Screen
        name="ZaamoSupportScreen"
        component={ZaamoSupportScreen}
      />
      <StoreStack.Screen
        name="RegisterAsCompanyScreen"
        component={RegisterAsCompanyScreen}
      />
      <StoreStack.Screen
        name="LogisticsSettingsScreen"
        component={LogisticsSettingsScreen}
      />
      <StoreStack.Screen
        name="PaymentDetailsScreen"
        component={PaymentDetailsScreen}
      />
      <StoreStack.Screen
        name="TermsAndConditionsScreen"
        component={TermsAndConditionsScreen}
      />
    </StoreStack.Navigator>
  );
};

export const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="AuthStack" component={AuthorizationStack} />
      <MainStack.Screen name="StoreStack" component={HomeTabNavigator} />
    </MainStack.Navigator>
  );
};
export const ProductStackNavigator = () => {
  return (
    <ProductStack.Navigator screenOptions={{headerShown: false}}>
      <ProductStack.Screen
        name="ProductsTabScreen"
        component={ProductsTabScreen}
      />
    </ProductStack.Navigator>
  );
};
export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} />
      <HomeStack.Screen name="InstaWorldScreen" component={InstaWorldScreen} />
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
        component={ProductStackNavigator}
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
        component={MarketingStackNavigator}
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
        component={StoreStackNavigator}
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
      initialRouteName={'SplashScreen'}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="MobileOTPScreen" component={MobileOTPScreen} />
      <AuthStack.Screen name="VerifyOTPScreen" component={VerifyOTPScreen} />
      <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
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
