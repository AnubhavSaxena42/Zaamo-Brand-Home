import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import {useMutation} from '@apollo/client';
import {TOKEN_CREATE, USER_REGISTER} from './mutations';
import {useDispatch} from 'react-redux';
import authService from '../../services/auth-service';
import {setUser, setToken} from '../../redux/reducers/userReducer';
import {saveItemToStorage} from '../../services/storage-service';
const LoginSuccessScreen = ({navigation, route}) => {
  const [createToken, {data, loading, error}] = useMutation(TOKEN_CREATE, {
    variables: {
      mobileNo: '91' + route.params.mobileNumber,
    },
  });
  const [userRegister, {registerData, registerLoading, registerError}] =
    useMutation(USER_REGISTER, {
      variables: {
        mobileNo: '91' + route.params.mobileNumber,
      },
    });
  const dispatch = useDispatch();
  useEffect(() => {
    createToken();
  }, []);
  useEffect(() => {
    if (data && data.tokenCreate.user.isActive) {
      console.log('in token create');
      dispatch(setUser(data.tokenCreate.user));
      dispatch(setToken(data.tokenCreate.token));
      saveItemToStorage('User', JSON.stringify(data.tokenCreate.user));
      authService
        .getStoreId(data.tokenCreate.user.userId)
        .then(store => {
          console.log(store);
          saveItemToStorage('Store-ID', store.store_id.toString());
        })
        .catch(err => console.log(err));
      saveItemToStorage('Token', data.tokenCreate.token)
        .then(res => console.log('Token Stored:', res))
        .catch(err => console.log('Error storing token:', err));
      navigation.navigate('StoreStack');
    } else {
      if (data && data.tokenCreate) {
        console.log('in register');
        dispatch(setUser(data.tokenCreate.user));
        dispatch(setToken(data.tokenCreate.token));
        saveItemToStorage('User', JSON.stringify(data.tokenCreate.user));
        authService
          .getStoreId(data.tokenCreate.user.userId)
          .then(store => {
            console.log(store);
            saveItemToStorage('Store-ID', store.store_id.toString());
          })
          .catch(err => console.log(err));
        saveItemToStorage('Token', data.tokenCreate.token)
          .then(res => console.log('Token Stored:', res))
          .catch(err => console.log('Error storing token:', err));
        userRegister();
      }
    }
  }, [data]);
  useEffect(() => {
    if (registerData && registerData.userRegister.user.isActive === 'true') {
      navigation.navigate('StoreStack');
    }
  }, [registerData]);
  return (
    <View style={styles.loginSuccessContainer}>
      <Image
        style={styles.imageStyle}
        source={require('../../assets/images/smugcat.jpg')}
      />
      <Text
        style={{
          fontSize: 24,
          marginBottom: '2%',
          color: 'black',
          fontWeight: '600',
          fontFamily: 'Roboto-Bold',
        }}>
        Congratulations
      </Text>
      <Text
        style={{fontSize: 14, marginBottom: '20%', color: 'rgba(0,0,0,0.5)'}}>
        You have succesfully signed in
      </Text>
      <Text style={{fontSize: 16, color: 'rgba(0,0,0,0.5)'}}>
        The Zaamo team will reach out to you shortly to
      </Text>
      <Text style={{fontSize: 16, color: 'rgba(0,0,0,0.5)'}}>
        activate your account
      </Text>
    </View>
  );
};

export default LoginSuccessScreen;

const styles = StyleSheet.create({
  loginSuccessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '50%',
    height: 200,
    marginBottom: '10%',
  },
  button: {
    marginTop: '10%',
    height: '8%',
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
