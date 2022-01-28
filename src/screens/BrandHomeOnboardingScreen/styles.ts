import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
export const styles = StyleSheet.create({
  BrandHomeOnboardingScreenContainer: {
    flex: 1,
    alignItems: 'center',
  },
  continueButton: {
    height: 40,
    width: '25%',
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  carouselItem: {
    width,
    alignItems: 'center',
    padding: 20,
  },
  continueButtonText: {
    color: 'black',
    fontSize: 16,
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageStyle: {
    width: width / 3,
    height: height / 3,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 0.3,
  },
  titleText: {
    fontWeight: '800',
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  descriptionText: {
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
  },
});
