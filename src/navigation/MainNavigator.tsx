import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Platform} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductTaggingPanelScreen from '../screens/ProductTaggingPanelScreen';
import CreateVariantScreen from '../screens/CreateVariantsScreen/CreateVariantScreen';
import AddProductScreen from '../screens/AddProductScreen';
import BrandHomeOnboardingScreen from '../screens/BrandHomeOnboardingScreen/BrandHomeOnboardingScreen';
import CreateProductScreen from '../screens/CreateProductScreen/CreateProductScreen';
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
import ProductPage from '../screens/ProductDisplayPage/ProductPage';
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
import CreateCouponScreen from '../screens/CreateCouponScreen/CreateCouponScreen';
import CollectionViewScreen from '../screens/CollectionViewScreen/CollectionViewScreen';
import CollectionProductsAddScreen from '../screens/CollectionProductsAddScreen/CollectionProductsAddScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
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
      }}
      initialRouteName="MarketingScreen">
      <MarketingStack.Screen
        name="MarketingScreen"
        component={MarketingScreen}
      />
      <MarketingStack.Screen
        name="CouponInfoScreen"
        component={CouponInfoScreen}
      />
      <MarketingStack.Screen
        name="CreateCouponScreen"
        component={CreateCouponScreen}
      />
      <MarketingStack.Screen
        name="CollectionProductsAddScreen"
        component={CollectionProductsAddScreen}
      />
      <MarketingStack.Screen name="ProductPage" component={ProductPage} />
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
      <ProductStack.Screen
        name="CreateProductScreen"
        component={CreateProductScreen}
      />
      <ProductStack.Screen
        name="CreateVariantScreen"
        component={CreateVariantScreen}
      />
      <ProductStack.Screen
        name="CollectionProductsAddScreen"
        component={CollectionProductsAddScreen}
      />
      <ProductStack.Screen
        name="CollectionViewScreen"
        component={CollectionViewScreen}
      />
      <ProductStack.Screen name="ProductPage" component={ProductPage} />
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
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'ProductPage') return false;
    else if (routeName === 'OrderDetailsScreen') return false;
    else return true;
  };
  return (
    <HomeTabs.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        keyboardHidesTabBar: true,
        inactiveTintColor: 'gray',
        labelStyle: {
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        },
        style: {
          height: Platform.OS === 'ios' ? '10%' : '8%',
          paddingVertical: 8,
        },
      }}>
      {/*<HomeTabs.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Entypo name="home" size={22} color={focused ? color : 'gray'} />
          ),
        }}
      />*/}
      <HomeTabs.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={({route}) => {
          return {
            tabBarVisible: getTabBarVisibility(route),
            tabBarIcon: ({focused, color}) => (
              <View
                style={{
                  position: 'relative',
                  alignItems: 'center',
                  marginTop: 7,
                }}>
                <View style={{position: 'absolute', top: -9}}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={22}
                    style={{marginVertical: 0}}
                    color={focused ? color : 'gray'}
                  />
                </View>
                <View style={{position: 'absolute', bottom: -6}}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={22}
                    color={focused ? color : 'gray'}
                  />
                </View>
              </View>
            ),
          };
        }}
      />
      <HomeTabs.Screen
        name="Products"
        component={ProductStackNavigator}
        options={({route}) => {
          return {
            tabBarIcon: ({focused, color}) => (
              <Entypo
                name="price-tag"
                size={22}
                color={focused ? color : 'gray'}
              />
            ),
            tabBarVisible: getTabBarVisibility(route),
          };
        }}
      />
      <HomeTabs.Screen
        name="Marketing"
        component={MarketingStackNavigator}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Entypo
              name="line-graph"
              size={22}
              color={focused ? color : 'gray'}
            />
          ),
        }}
      />
      <HomeTabs.Screen
        name="Store"
        component={StoreStackNavigator}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Fontisto
              name="shopping-store"
              size={22}
              color={focused ? color : 'gray'}
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
      <AuthStack.Screen
        name="BrandHomeOnboardingScreen"
        component={BrandHomeOnboardingScreen}
      />
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
      <TaggingStack.Screen name="variants" component={CreateVariantScreen} />
    </TaggingStack.Navigator>
  );
};

export default TaggingPanelStack;
