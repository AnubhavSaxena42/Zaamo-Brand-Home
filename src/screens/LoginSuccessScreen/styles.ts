import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
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
  congratulations: {
    height: 200,
  },
  congratulationsText: {
    fontSize: 24,
    marginBottom: '2%',
    color: 'black',
    fontWeight: '600',
    fontFamily: 'Roboto-Bold',
  },
  signInText: {
    fontSize: 14,
    marginBottom: '20%',
    color: 'rgba(0,0,0,0.5)',
  },
  signInBottomText: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
  },
});
