import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  instaWorldContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
  },
  backgroundImage: {
    height: 400,
    width: width,
    zIndex: 1,
    position: 'absolute',
    top: -275,
  },
  backButton: {
    zIndex: 2,
    position: 'absolute',
    left: 10,
    top: '15%',
  },
  headerText: {
    color: 'white',
    zIndex: 2,
    marginTop: '5%',
    fontSize: 22,
    paddingHorizontal: '10%',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  headerSubText: {
    color: 'white',
    zIndex: 2,
    marginTop: '2%',
    fontSize: 16,
    paddingHorizontal: '10%',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  notificationsContainer: {
    marginTop: '5%',
    paddingBottom: 15,
  },
});
