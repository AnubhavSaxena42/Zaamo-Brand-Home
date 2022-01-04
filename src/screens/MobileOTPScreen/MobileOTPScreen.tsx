import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import smugcat from '../../assets/images/smugcat.jpg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useMutation} from '@apollo/client';
import {GENERATE_OTP} from './mutations';
import PhoneSVG from './phone';
import {useDispatch} from 'react-redux';
import toastService from '../../services/toast-service';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
//import {TextInput} from 'react-native-gesture-handler';
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
        navigation.navigate('VerifyOTPScreen', {
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
      <View style={styles.iconContainer}>
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          color={'rgba(0,0,0,0.5)'}
        />
      </View>
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
          setMobileNumber(text);
        }}
        style={styles.numberInput}
        keyboardType="number-pad"
        value={mobileNumber}
      />
      {errorMessage && (
        <Text style={{marginBottom: '4%'}}>Enter a valid mobile Number</Text>
      )}
      <TouchableOpacity
        onPress={() => {
          if (mobileNumber.length !== 10) {
            setErrorMessage(true);
            return;
          } else {
            console.log('in else block');
            generateOtp();
          }
        }}
        style={styles.button}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>GET OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MobileOTPScreen;

const styles = StyleSheet.create({
  mobileOTPContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: '2%',
    left: '5%',
  },
  headingText: {
    fontFamily: 'Roboto-Bold',
    color: 'black',
    fontSize: 24,
    marginBottom: '3%',
    marginTop: '3%',
  },
  imageStyle: {
    width: '50%',
    marginBottom: '10%',
    height: 200,
  },
  infoText: {
    fontSize: 16,
    color: 'gray',
    paddingHorizontal: '10%',
  },
  otpText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  numberInput: {
    fontSize: 20,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
    width: '60%',
    marginBottom: '15%',
    textAlign: 'center',
  },
  button: {
    height: 60,
    borderRadius: 10,
    width: '90%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
