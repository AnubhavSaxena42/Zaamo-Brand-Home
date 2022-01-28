import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  registerAsCompanyContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  registerAsCompanyHeaderContainer: {
    alignItems: 'center',
  },
  backgroundImage: {
    height: 400,
    width: width,
    zIndex: 1,
    position: 'absolute',
    top: -300,
  },
  headerText: {
    color: 'white',
    zIndex: 2,
    marginTop: '7%',
    fontSize: 22,
    paddingHorizontal: '10%',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  backButton: {
    zIndex: 2,
    marginTop: '6%',
    position: 'absolute',
    left: 10,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    height: 160,
  },
  button: {
    marginBottom: '10%',
    height: 35,
    borderRadius: 10,
    marginTop: '10%',
    width: '25%',
    alignSelf: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
