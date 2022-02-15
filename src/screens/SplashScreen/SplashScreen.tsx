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
  //So messy refactor it !!
  /* Fetch the token,user,mobileNumber,firstTimeUser
    if we have the token user and mobileNumber redirect to StoreStack
    if we dont have token or user {
      if we have mobileNumber,redirect to LoginSuccessScreen
      if we dont have mobileNumber{
        if we have FirstTimeUser, redirect to mobileOTPScreen
        if we dont have FirstTimeUser, redirect to Carousel
      }
    }
  */

  const initApp = async () => {
    const token = await getItemFromStorage('Token');
    const user = await getItemFromStorage('User');
    const mobileNumber = await getItemFromStorage('Mobile Number');
    const isFirstTimeUser = await getItemFromStorage('First Time User');
    if (token && user && mobileNumber) {
      dispatch(setToken(token));
      dispatch(setUser(JSON.parse(user)));
      dispatch(setMobileNumber(mobileNumber));
      navigation.replace('StoreStack');
    } else {
      if (mobileNumber) {
        dispatch(setMobileNumber(mobileNumber));
        navigation.replace('LoginSuccessScreen', {
          mobileNumber: mobileNumber,
        });
      } else {
        if (!isFirstTimeUser) {
          await saveItemToStorage('First Time User', 'false');
          navigation.replace('BrandHomeOnboardingScreen');
        } else {
          navigation.replace('MobileOTPScreen');
        }
      }
    }
  };

  useEffect(() => {
    /*  GARBAGE KEEP IT HERE UNTIL TESTING JUST IN CASE 
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
        //We will never reach here
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
      */
    initApp();
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
