import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  splashScreenContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashScreenImage: {
    height: 150,
    width: 150,
  },
});
