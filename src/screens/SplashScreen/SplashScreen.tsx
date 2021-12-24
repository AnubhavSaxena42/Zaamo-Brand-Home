import React, {useEffect} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {getItemFromStorage} from '../../services/storage-service';
import {useDispatch} from 'react-redux';
import {setToken, setUser} from '../../redux/reducers/userReducer';
const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getItemFromStorage('Token')
      .then(token => {
        if (token && token !== '') {
          getItemFromStorage('User').then(user => {
            if (user && user !== '') {
              const userObj = JSON.parse(user);
              dispatch(setToken(token));
              dispatch(setUser(userObj));
            }
            navigation.navigate('StoreStack');
          });
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
        style={{height: 150, width: 150}}
        source={require('../../assets/images/zaamo.jpg')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
