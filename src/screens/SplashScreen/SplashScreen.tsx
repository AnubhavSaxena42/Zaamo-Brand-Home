import React, {useEffect} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {getItemFromStorage} from '../../services/storage-service';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    getItemFromStorage('Token')
      .then(res => {
        if (res && res !== '') {
          navigation.navigate('StoreStack');
        } else {
          navigation.navigate('MobileOTPScreen');
        }
      })
      .catch(err => {
        navigation.navigate('MobileOTPScreen');
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{height: 350, width: 350}}
        source={require('../../assets/images/zaamo.jpg')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
