import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  customiseLandingPageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backButton: {
    zIndex: 2,
    top: 40,
    position: 'absolute',
    left: 10,
  },
  comingSoonStyle: {
    height: 160,
  },
});
