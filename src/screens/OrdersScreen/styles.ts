import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  ordersContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    fontSize: 28,
  },
  headingText: {
    zIndex: 2,
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginTop: '3%',
    fontFamily: 'Roboto-Bold',
  },
  backgroundImageStyle: {
    height: 400,
    width: width,
    zIndex: 1,
    position: 'absolute',
    top: -250,
  },
  ordersOverviewCardContainer: {
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '5%',
    marginBottom: '2%',
  },
  ordersListContainer: {
    flex: 1,
    marginTop: 5,
    backgroundColor: 'white',
  },
  tabsContainer: {
    paddingBottom: 10,
  },
});
