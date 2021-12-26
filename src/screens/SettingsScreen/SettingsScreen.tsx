import React from 'react';
import {StyleSheet, Image, Dimensions, Text, View} from 'react-native';
import SettingOption from '../../components/SettingOption/SettingOption';
const windowWidth = Dimensions.get('window').width;
const SettingsScreen = ({navigation, route}) => {
  return (
    <View style={styles.settingsContainer}>
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
            setting={'Customise Landing Page'}
            imageUrl={require('../../assets/icons/customiseLandingPage.png')}
          />
          <SettingOption
            onPress={() => navigation.navigate('StoreThemesScreen')}
            setting={'Store Themes'}
            imageUrl={require('../../assets/icons/storeThemes.png')}
          />
          <SettingOption
            setting={'Payment Details'}
            imageUrl={require('../../assets/icons/paymentdetails.png')}
          />
          <SettingOption
            onPress={() => navigation.navigate('ConnectMySocialScreen')}
            setting={'Connect my Social'}
            imageUrl={require('../../assets/icons/network.png')}
          />
          <SettingOption
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
            setting={'Zaamo Support'}
            imageUrl={require('../../assets/icons/zaamosupport.png')}
          />
          <SettingOption
            setting={'Brand Guidelines'}
            imageUrl={require('../../assets/icons/brandguidelines.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
