import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import {useMutation} from '@apollo/client';
import {VERIFY_OTP} from './mutations';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PhoneSVG from '../MobileOTPScreen/phone';
const VerifyOTPScreen = ({navigation, route}) => {
  const [otp, setOtp] = useState('');
  const [verifyOtp, {data, error, loading}] = useMutation(VERIFY_OTP, {
    variables: {
      mobileNo: '91' + route.params.mobileNumber,
      otp: 2474,
    },
  });
  console.log(data, error, loading);
  return (
    <View style={styles.verifyOTPContainer}>
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
        Enter the OTP sent to{' '}
        <Text style={styles.otpText}>{route.params.mobileNumber}</Text>
      </Text>
      <TextInput
        value={otp}
        onChangeText={text => setOtp(text)}
        style={styles.numberInput}
      />
      <Text style={{...styles.infoText, marginBottom: '7%'}}>
        Didn't receive the OTP?
        <Text style={styles.otpText}>RESEND OTP</Text>
      </Text>
      <TouchableOpacity
        onPress={() => {
          verifyOtp();
          navigation.navigate('ConnectInstaScreen', {
            mobileNumber: route.params.mobileNumber,
          });
        }}
        style={styles.button}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          VERIFY & PROCEED
        </Text>
      </TouchableOpacity>
      <Modal visible={false}>
        {/* Your number has been verified ???? and then navigate?*/}
      </Modal>
    </View>
  );
};

export default VerifyOTPScreen;

const styles = StyleSheet.create({
  verifyOTPContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: '2%',
    left: '5%',
  },
  imageStyle: {
    height: 200,
    width: '50%',
    marginBottom: '10%',
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
  headingText: {
    fontFamily: 'Roboto-Bold',
    color: 'black',
    fontSize: 24,
    marginBottom: '3%',
    marginTop: '3%',
  },
  numberInput: {
    fontSize: 20,
    color: 'black',
    borderBottomWidth: 1,
    textAlign: 'center',
    borderBottomColor: 'rgba(0,0,0,0.5)',
    width: '60%',
    marginBottom: '7%',
  },
  button: {
    height: '10%',
    borderRadius: 5,
    width: '90%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
