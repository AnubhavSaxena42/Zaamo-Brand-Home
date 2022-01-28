import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {useMutation} from '@apollo/client';
import {GENERATE_OTP} from './mutations';
import PhoneSVG from './phone';
import {useDispatch} from 'react-redux';
import toastService from '../../services/toast-service';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import {styles} from './styles';
const MobileOTPScreen = ({navigation, route}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const [generateOtp, {data, loading, error}] = useMutation(GENERATE_OTP, {
    variables: {
      mobileNo: '91' + mobileNumber,
    },
  });
  console.log(data, loading, error);
  useEffect(() => {
    if (data) {
      if (data.generateOtp.success) {
        navigation.replace('VerifyOTPScreen', {
          mobileNumber: mobileNumber,
        });
      } else {
        toastService.showToast('Could not generate OTP,Try again.', true);
      }
    }
  }, [data]);
  useEffect(() => {
    if (loading) {
      dispatch(setLoaderStatus(true));
    } else {
      dispatch(setLoaderStatus(false));
    }
  }, [loading]);
  return (
    <View style={styles.mobileOTPContainer}>
      <PhoneSVG />
      <Text style={styles.headingText}>OTP Verification</Text>
      <Text style={styles.infoText}>
        We will send you an{' '}
        <Text style={styles.otpText}>One Time Password</Text>
      </Text>
      <Text
        style={{...styles.infoText, marginBottom: '10%', textAlign: 'center'}}>
        On your Mobile Number
      </Text>
      <Text style={styles.infoText}>Enter Mobile Number</Text>
      <TextInput
        onChangeText={text => {
          if (text.length > 10) return;
          const reg = new RegExp('[0-9]');
          if (reg.test(text)) setMobileNumber(text);
          if (text.length === 0) setMobileNumber(text);
        }}
        style={styles.numberInput}
        keyboardType="number-pad"
        value={mobileNumber}
      />
      {errorMessage && (
        <Text style={styles.errorMessageStyle}>
          Enter a valid mobile Number
        </Text>
      )}
      <TouchableOpacity
        onPress={() => {
          if (mobileNumber.length !== 10) {
            setErrorMessage(true);
            return;
          } else {
            console.log('in else block');
            navigation.navigate('VerifyOTPScreen', {
              mobileNumber: mobileNumber,
            });
            //generateOtp();
          }
        }}
        style={styles.button}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>GET OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MobileOTPScreen;
