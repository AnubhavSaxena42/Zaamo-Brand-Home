import React, {useEffect} from 'react';
import {StyleSheet, Platform, Alert, Text, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {useMutation} from '@apollo/client';
import {TOKEN_CREATE, USER_REGISTER} from './mutations';
import {useDispatch} from 'react-redux';
import authService from '../../services/auth-service';
import {
  setUser,
  setToken,
  setMobileNumber,
} from '../../redux/reducers/userReducer';
import {
  getItemFromStorage,
  saveItemToStorage,
} from '../../services/storage-service';
import CongratulationsSVG from './Congratulations';
import toastService from '../../services/toast-service';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import {request, PERMISSIONS, openSettings} from 'react-native-permissions';
import {styles} from './styles';
const LoginSuccessScreen = ({navigation, route}) => {
  console.log('Route mobile number:', route.params.mobileNumber);
  const [createToken, {data, loading, error}] = useMutation(TOKEN_CREATE, {
    variables: {
      mobileNo: '91' + route.params.mobileNumber,
    },
  });
  const [userRegister, registerResponse] = useMutation(USER_REGISTER, {
    variables: {
      mobileNo: '91' + route.params.mobileNumber,
    },
  });

  const handlePermission = async () => {
    async function requestAll() {
      const cameraStatus = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      });

      const audioStatus = Platform.select({
        android: PERMISSIONS.ANDROID.RECORD_AUDIO,
        ios: PERMISSIONS.IOS.CAMERA, //ios only
      });

      const photoLibrary = Platform.select({
        // android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      });

      const writePhotoLibrary = Platform.select({
        android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      });

      const isCamera = await request(cameraStatus);
      const isAudio = await request(audioStatus);
      const isPhotoLibrary = await request(photoLibrary);
      const isWritePhotoLibrary = await request(writePhotoLibrary);
      return {isCamera, isAudio, isPhotoLibrary, isWritePhotoLibrary};
    }

    requestAll().then(status => {
      console.log('status', status);
      if (
        status.isAudio == 'granted' &&
        status.isCamera == 'granted' &&
        status.isPhotoLibrary == 'granted' &&
        status.isWritePhotoLibrary == 'granted'
      ) {
        navigation.replace('StoreStack');
      } else {
        Alert.alert(
          '',
          'All Permissions' +
            ' is required to use this app. Please grant the permission to continue',
          [
            {
              text: 'OK',
              onPress: () => {
                if (
                  status.isAudio == 'blocked' ||
                  status.isCamera == 'blocked' ||
                  status.isPhotoLibrary == 'blocked' ||
                  status.isWritePhotoLibrary == 'blocked'
                ) {
                  openSettings();
                } else {
                  handlePermission();
                }
              },
            },
          ],
        );
      }
    });
  };
  const handleLogin = () => {
    if (data && data.tokenCreate && data.tokenCreate.user) {
      if (data.tokenCreate.user.isActive && data.tokenCreate.token) {
        if (data.tokenCreate.user.authorisedBrands.length === 0) {
          toastService.showToast(
            'No Brands are authorised for this account, contact Zaamo Support',
            true,
          );
          return;
        }
        console.log('in token create');
        dispatch(setUser(data.tokenCreate.user));
        dispatch(setToken(data.tokenCreate.token));
        if (route.params.mobileNumber) {
          dispatch(setMobileNumber(route.params.mobileNumber));
          saveItemToStorage('Mobile Number', route.params.mobileNumber);
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
          toastService.showToast('Logged in successfully', true);
          setTimeout(() => handlePermission(), 3000);
        } else {
          getItemFromStorage('Mobile Number').then(mobileNumber => {
            if (mobileNumber) {
              dispatch(setMobileNumber(mobileNumber));
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
            } else {
              console.log('mobile number not found');
              userRegister();
            }
          });
        }
      } else {
        console.log('In register block');
        userRegister();
      }
    } else {
      console.log('registering');
      userRegister();
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(createToken, 2000);
  }, []);
  useEffect(() => {
    handleLogin();
  }, [data]);
  useEffect(() => {
    if (loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [loading]);
  useEffect(() => {
    if (registerResponse) {
      console.log(registerResponse);
    }
  }, [registerResponse]);
  return (
    <View style={styles.loginSuccessContainer}>
      <AnimatedLottieView
        source={require('../../assets/animations/congratulations.json')}
        autoPlay
        style={styles.congratulations}
        loop={false}
      />
      <Text style={styles.congratulationsText}>Congratulations</Text>
      <Text style={styles.signInText}>You have succesfully signed in</Text>
      <Text style={styles.signInBottomText}>
        The Zaamo team will reach out to you shortly to
      </Text>
      <Text style={styles.signInBottomText}>activate your account</Text>
    </View>
  );
};

export default LoginSuccessScreen;
