import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  storeThemesContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  storeThemesScrollViewContainer: {
    flex: 1,
  },
  backButton: {
    zIndex: 2,
    marginTop: '6%',
    position: 'absolute',
    left: 10,
  },
  backgroundImageStyle: {
    height: 400,
    width: width,
    zIndex: 1,
    position: 'absolute',
    top: -300,
  },
  storeThemesHeaderText: {
    color: 'white',
    zIndex: 2,
    marginTop: '7%',
    fontSize: 22,
    paddingHorizontal: '10%',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Roboto-Bold',
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
  fontStyleText: {
    marginTop: '1%',
    padding: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: 'gray',

    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.2)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
