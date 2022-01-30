import React, {useEffect} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {
  getItemFromStorage,
  saveItemToStorage,
} from '../../services/storage-service';
import {useDispatch} from 'react-redux';
import {
  setMobileNumber,
  setToken,
  setUser,
} from '../../redux/reducers/userReducer';
import {styles} from './styles';
const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getItemFromStorage('Token')
      .then(token => {
        if (token && token !== '') {
          getItemFromStorage('User').then(user => {
            if (user && user !== '') {
              console.log('User:', user);
              const userObj = JSON.parse(user);
              dispatch(setToken(token));
              dispatch(setUser(userObj));
              getItemFromStorage('Mobile Number').then(mobileNumber => {
                if (mobileNumber) {
                  dispatch(setMobileNumber(mobileNumber));
                  navigation.replace('StoreStack');
                } else {
                  console.log('Mobile Number not found');
                  navigation.replace('StoreStack');
                }
              });
            }
          });
        } else {
          console.log('in else block 1');
          getItemFromStorage('First Time User').then(firstTimeUser => {
            if (!firstTimeUser) {
              console.log('First Time User:', firstTimeUser);
              saveItemToStorage('First Time User', 'false');
              navigation.navigate('BrandHomeOnboardingScreen');
            } else {
              console.log('Reaching where it should not reach');
              getItemFromStorage('Mobile Number').then(mobileNumber => {
                console.log('Mobile Number:', mobileNumber);
                if (mobileNumber && mobileNumber.length !== 0) {
                  navigation.replace('LoginSuccessScreen', {
                    mobileNumber: mobileNumber,
                  });
                } else {
                  navigation.replace('MobileOTPScreen');
                }
              });
            }
          });
        }
      })
      .catch(err => {
        console.log('in else block');
        getItemFromStorage('Mobile Number')
          .then(mobileNumber => {
            console.log('Mobile Number:', mobileNumber);
            if (mobileNumber && mobileNumber.length !== 0) {
              navigation.replace('LoginSuccessScreen', {
                mobileNumber: mobileNumber,
              });
            } else {
              navigation.replace('MobileOTPScreen');
            }
          })
          .catch(err => {
            navigation.replace('MobileOTPScreen');
          });
      });
  }, []);

  return (
    <View style={styles.splashScreenContainer}>
      <Image
        style={styles.splashScreenImage}
        source={require('../../assets/images/zaamo.jpg')}
      />
    </View>
  );
};

export default SplashScreen;
