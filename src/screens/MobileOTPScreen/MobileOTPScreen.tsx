import React, {useState} from 'react';
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
//import {TextInput} from 'react-native-gesture-handler';
const MobileOTPScreen = ({navigation, route}) => {
  const [mobileNumber, setMobileNumber] = useState('');

  return (
    <View style={styles.mobileOTPContainer}>
      <View style={styles.iconContainer}>
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          color={'rgba(0,0,0,0.5)'}
        />
      </View>
      <Image
        source={require('../../assets/images/smugcat.jpg')}
        style={styles.imageStyle}
      />
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
        onChangeText={text => setMobileNumber(text)}
        style={styles.numberInput}
        value={mobileNumber}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('VerifyOTPScreen', {mobileNumber: mobileNumber})
        }
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
  },
  imageStyle: {
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
    height: '8%',
    borderRadius: 10,
    width: '90%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
