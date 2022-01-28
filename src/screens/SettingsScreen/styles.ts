import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImageStyle: {
    height: 400,
    width: width,
    zIndex: 1,
    position: 'absolute',
    top: -300,
  },
  headingText: {
    color: 'white',
    zIndex: 2,
    marginTop: '5%',
    fontSize: 22,
    paddingHorizontal: '10%',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  optionsHeadingContainer: {
    flex: 1,
    marginTop: '10%',
  },
  optionsHeading: {
    marginLeft: '7%',
    fontWeight: 'bold',
    color: 'black',
  },
  optionsContainer: {
    marginTop: '6%',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  logoutButton: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '2%',
  },
  logoutButtonText: {
    color: 'white',
  },
});
