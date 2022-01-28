import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
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
    marginTop: '5%',
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
  errorMessageStyle: {
    marginBottom: '4%',
  },
});
