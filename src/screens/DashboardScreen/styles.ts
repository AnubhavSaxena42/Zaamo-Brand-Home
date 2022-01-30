import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    justifyContent: 'center',
  },
  headingText: {
    zIndex: 2,
    paddingTop: '3%',
    color: 'white',
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
  },
  backgroundImageStyle: {
    height: 350,
    width: width,
    zIndex: 1,
    position: 'absolute',
    top: -100,
  },
  metricsTopContainer: {
    zIndex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '4%',
  },
  metricsBottomContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 2,
  },
  updateHeadingText: {
    color: 'black',
    fontSize: 14,
    paddingLeft: '3%',
    fontFamily: 'Roboto-Bold',
    marginBottom: '2%',
    marginTop: '2%',
  },
  scrollViewContentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
  },
  instaWorldButton: {
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 50,
    right: 20,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    zIndex: 3,
  },
  comingSoonStyle: {
    height: 150,
  },
});
