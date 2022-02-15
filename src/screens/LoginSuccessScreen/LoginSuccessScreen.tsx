import React, {useEffect} from 'react';
import {StyleSheet, Platform, Alert, Text, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {useMutation, useLazyQuery} from '@apollo/client';
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
import toastService from '../../services/toast-service';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import {request, PERMISSIONS, openSettings} from 'react-native-permissions';
import {styles} from './styles';
import {GET_USER_ACTIVE} from './queries';
const LoginSuccessScreen = ({navigation, route}) => {
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

  const [getActiveStatus, userQueryResponse] = useLazyQuery(GET_USER_ACTIVE, {
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
            ' are required to use this app. Please grant the permissions to continue',
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

  /* Whats going on uptill now
  Basically
  Run the token Create Mutation
  if it returns the user and the token save them to the storage and redux and then log the user in
  if the token or user is returned null,run the userByMobile Query and if the user isActive is false then run the userRegister Mutation and handle its response gracefully
  if the token and user is returned but there are no authorised brands prevent the user from logging in with a toast

  Instead what i should do maybe is check if the user exists before even running the tokenCreate Mutation for the user 
  So the userByMobile Query comes into play over here 
  ==> First hit the userByMobile Query
  if the user is null, run the userRegister Mutation, handle response
  if the user is not null{
    if isActive, run the token create mutation and follow what you were doing before
    else toast that the account has not yet been activated
  }
*/

  const handleLogin = async () => {
    if (data && data.tokenCreate && data.tokenCreate.user) {
      if (data.tokenCreate.user.authorisedBrands.length === 0) {
        toastService.showToast(
          'No Brands are authorised for this account, contact Zaamo Support',
          true,
        );
        return;
      }
      const store = await authService.getStoreId(data.tokenCreate.user.userId);
      dispatch(setUser(data.tokenCreate.user));
      dispatch(setToken(data.tokenCreate.token));
      dispatch(setMobileNumber(route.params.mobileNumber));
      await saveItemToStorage('Mobile Number', route.params.mobileNumber);
      await saveItemToStorage('User', JSON.stringify(data.tokenCreate.user));
      await saveItemToStorage('Store-ID', store.store_id.toString());
      await saveItemToStorage('Token', data.tokenCreate.token);
      toastService.showToast('Logged in successfully', true);
      setTimeout(() => handlePermission(), 3000);
    }
  };
  useEffect(() => {
    setTimeout(getActiveStatus, 2000);
  }, []);

  useEffect(() => {
    if (userQueryResponse.data) {
      if (userQueryResponse.data.userByMobile) {
        if (userQueryResponse.data.userByMobile.isActive) {
          createToken();
        } else {
          toastService.showToast(
            'You have been registered successfully, please wait until account activation is complete',
            true,
          );
        }
      } else {
        userRegister();
      }
    }
  }, [userQueryResponse.data]);
  /* GARBAGE const handleLogin = () => {
    if (data && data.tokenCreate && data.tokenCreate.user) {
      if (data.tokenCreate.user.isActive && data.tokenCreate.token) {
        if (data.tokenCreate.user.authorisedBrands.length === 0) {
          toastService.showToast(
            'No Brands are authorised for this account, contact Zaamo Support',
            true,
          );
          return;
        }
        //Change these to reactive vars
        dispatch(setUser(data.tokenCreate.user));
        dispatch(setToken(data.tokenCreate.token));
        if (route.params.mobileNumber) {
          console.log('No buddy you are never there');
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
          console.log('Am I ever even here? I Dont think so!');
          //User has been redirected here from the initialisation
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
              //Mobile number not present in storage neither has it been passed through route
              console.log('mobile number not found');
              userRegister();
            }
          });
        }
      } else {
        //User Not active
        console.log('In register block');
        userRegister();
      }
    } else {
      //User First time registering
      //console.log('registering');
      //userRegister();
    }
  };
  */
  const dispatch = useDispatch();

  /*useEffect(() => {
    setTimeout(createToken, 2000);
  }, []);
  */
  useEffect(() => {
    handleLogin();
  }, [data]);

  useEffect(() => {
    if (loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [loading]);

  useEffect(() => {
    if (registerResponse.data) {
      console.log('called');
      console.log(registerResponse.data);
      if (
        registerResponse.data.userRegister.user &&
        registerResponse.data.userRegister.user.isActive === false
      ) {
        toastService.showToast(
          'You have been registered successfully,Please wait for account activation.',
          false,
        );
      } else {
        toastService.showToast(
          'Failed to register your account,Please try again later',
          true,
        );
      }
    }
  }, [registerResponse.data]);

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
