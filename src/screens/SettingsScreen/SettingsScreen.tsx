import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SettingOption from '../../components/SettingOption/SettingOption';
import {useDispatch} from 'react-redux';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import {
  deleteAllItemsFromStorage,
  saveItemToStorage,
} from '../../services/storage-service';
import toastService from '../../services/toast-service';
import {client} from '../../App';
const windowWidth = Dimensions.get('window').width;
const SettingsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setLoaderStatus(true));
    deleteAllItemsFromStorage()
      .then(() => {
        toastService.showToast('Logged out successfully', true);
        saveItemToStorage('First Time User', 'false');
        client.cache
          .reset()
          .then(() => {
            console.log('apollo success');
            navigation.replace('AuthStack');
            dispatch(setLoaderStatus(false));
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      >
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/DashboardEllipse.png')}
          style={{
            height: 400,
            width: windowWidth,
            zIndex: 1,
            position: 'absolute',
            top: -300,
          }}
        />
        <Text
          style={{
            color: 'white',
            zIndex: 2,
            marginTop: '5%',
            fontSize: 22,
            paddingHorizontal: '10%',
            textAlign: 'center',
            fontFamily: 'Roboto-Bold',
          }}>
          Lets customise your store as you want it!!
        </Text>
      </View>
      <View style={{flex: 1, marginTop: '10%'}}>
        <Text style={{marginLeft: '7%', fontWeight: 'bold', color: 'black'}}>
          Store Settings
        </Text>
        <View
          style={{
            marginTop: '6%',
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}>
          <SettingOption
            onPress={() => navigation.navigate('CustomiseLandingPageScreen')}
            setting={'Customise Landing Page'}
            imageUrl={require('../../assets/icons/customiseLandingPage.png')}
          />
          <SettingOption
            onPress={() => navigation.navigate('StoreThemesScreen')}
            setting={'Store Themes'}
            imageUrl={require('../../assets/icons/storeThemes.png')}
          />
          <SettingOption
            onPress={() => navigation.navigate('PaymentDetailsScreen')}
            setting={'Payment Details'}
            imageUrl={require('../../assets/icons/paymentdetails.png')}
          />
          <SettingOption
            onPress={() => navigation.navigate('ConnectMySocialScreen')}
            setting={'Connect my Social'}
            imageUrl={require('../../assets/icons/network.png')}
          />
          <SettingOption
            onPress={() => navigation.navigate('RegisterAsCompanyScreen')}
            setting={'Register as Company'}
            imageUrl={require('../../assets/icons/registerCompany.png')}
          />
          <SettingOption
            onPress={() => {
              navigation.navigate('TermsAndConditionsScreen');
            }}
            setting={'Terms & Conditions'}
            imageUrl={require('../../assets/icons/termsandconditions.png')}
          />
          <SettingOption
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}
            setting={'Privacy Policy'}
            imageUrl={require('../../assets/icons/privacypolicy.png')}
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
        </View>
        <TouchableOpacity
          onPress={logout}
          style={{
            alignSelf: 'center',
            width: '80%',
            backgroundColor: 'black',
            borderRadius: 10,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '2%',
          }}>
          <Text style={{color: 'white'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
