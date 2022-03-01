import React from 'react';
import {
  ScrollView,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import SettingOption from '../../components/SettingOption/SettingOption';
import {useDispatch, useSelector} from 'react-redux';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import {
  deleteAllItemsFromStorage,
  saveItemToStorage,
} from '../../services/storage-service';
import toastService from '../../services/toast-service';
import {client} from '../../App';
import {styles} from './styles';

const SettingsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const storeUrl = useSelector(state => state.store.storeInfo.storeUrl);
  const logout = () => {
    dispatch(setLoaderStatus(true));
    deleteAllItemsFromStorage()
      .then(() => {
        saveItemToStorage('First Time User', 'false');
        client.cache
          .reset()
          .then(() => {
            console.log('apollo success');
            dispatch(setLoaderStatus(false));
            setTimeout(() => navigation.replace('AuthStack'), 0);
          })
          .catch(() => {
            console.log('fail client');
            dispatch(setLoaderStatus(false));
          });
      })
      .catch(() => {
        toastService.showToast('Log out Fail', true);
        dispatch(setLoaderStatus(false));
      });
  };
  return (
    <SafeAreaView style={styles.settingsContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/DashboardEllipse.png')}
            style={styles.backgroundImageStyle}
          />
          <Text style={styles.headingText}>
            Lets customise your store as you want it!!
          </Text>
        </View>
        <View style={styles.optionsHeadingContainer}>
          <Text style={styles.optionsHeading}>Store Settings</Text>
          <View style={styles.optionsContainer}>
            {
              <SettingOption
                onPress={() =>
                  navigation.navigate('CustomiseLandingPageScreen')
                }
                setting={'Customise Landing Page'}
                imageUrl={require('../../assets/icons/customiseLandingPage.png')}
              />
            }
            {/*<SettingOption
              onPress={() => navigation.navigate('StoreThemesScreen')}
              setting={'Store Themes'}
              imageUrl={require('../../assets/icons/storeThemes.png')}
            />*/}
            <SettingOption
              onPress={() => navigation.navigate('PrivacyPolicyScreen')}
              setting={'Privacy Policy'}
              imageUrl={require('../../assets/icons/privacypolicy.png')}
            />

            <SettingOption
              onPress={() => navigation.navigate('ConnectMySocialScreen')}
              setting={'Connect my Social'}
              imageUrl={require('../../assets/icons/network.png')}
            />
            {/*<SettingOption
              onPress={() => navigation.navigate('RegisterAsCompanyScreen')}
              setting={'Register as Company'}
              imageUrl={require('../../assets/icons/registerCompany.png')}
            />*/}
            <SettingOption
              onPress={() => {
                navigation.navigate('TermsAndConditionsScreen');
              }}
              setting={'Terms & Conditions'}
              imageUrl={require('../../assets/icons/termsandconditions.png')}
            />
            <SettingOption
              onPress={() => navigation.navigate('PaymentDetailsScreen')}
              setting={'Payment Details'}
              imageUrl={require('../../assets/icons/paymentdetails.png')}
            />
            <SettingOption
              onPress={() => navigation.navigate('ReturnPolicyScreen')}
              setting={'Return Policy'}
              imageUrl={require('../../assets/icons/returnpolicy.png')}
            />
            <SettingOption
              onPress={() => {
                navigation.navigate('LogisticsSettingsScreen');
              }}
              setting={'Logistics Settings'}
              imageUrl={require('../../assets/icons/logistics.png')}
            />
            <SettingOption
              onPress={() => navigation.navigate('ZaamoSupportScreen')}
              setting={'Zaamo Support'}
              imageUrl={require('../../assets/icons/zaamosupport.png')}
            />
            <SettingOption
              onPress={() => navigation.navigate('BrandGuidelinesScreen')}
              setting={'Brand Guidelines'}
              imageUrl={require('../../assets/icons/brandguidelines.png')}
            />
            <SettingOption
              onPress={() => {
                navigation.navigate('ShippingPolicyScreen');
              }}
              setting={'Shipping Policy'}
              imageUrl={require('../../assets/icons/shippingPolicy.png')}
            />
            <SettingOption
              onPress={() => {
                navigation.navigate('CustomerSupportDetailsScreen');
              }}
              setting={'Customer Support Details'}
              imageUrl={require('../../assets/images/orderlist.png')}
            />
            {/*<SettingOption
              onPress={() => {
                console.log('Open the store bro');
                Linking.openURL(storeUrl);
              }}
              setting={'View My Store'}
              imageUrl={require('../../assets/icons/mystore.png')}
            />*/}
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
