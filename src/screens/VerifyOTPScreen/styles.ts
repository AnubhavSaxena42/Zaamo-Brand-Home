import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
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
    marginBottom: '7%',
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
    height: 60,
    borderRadius: 5,
    width: '90%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderStyleBase: {
    width: 40,
    height: 55,
    backgroundColor: 'white',
  },
  otpInputContainer: {
    width: '65%',
    height: 200,
  },
  borderStyleHighLighted: {
    borderColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorMessageStyle: {
    marginBottom: '5%',
  },
});
