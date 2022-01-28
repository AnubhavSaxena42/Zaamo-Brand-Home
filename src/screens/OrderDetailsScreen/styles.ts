import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  orderDetailsContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  headingText: {
    zIndex: 2,
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginTop: '5%',
    fontFamily: 'Roboto-Bold',
  },
  backButton: {
    zIndex: 2,
    position: 'absolute',
    left: 10,
    top: 20,
  },
  backgroundImageStyle: {
    height: 400,
    width: width,
    zIndex: 1,
    position: 'absolute',
    top: -250,
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
  orderCardContainer: {
    width: '100%',
    zIndex: 2,
    alignItems: 'center',
    marginTop: '4%',
  },
  orderItemsListContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  orderDetailsSection: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: '3%',
  },
  headerText: {
    color: 'black',
    fontWeight: '500',
    marginBottom: '3%',
  },
  userDetailsSection: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: '3%',
  },
  userDetailsSubSection: {
    paddingTop: '3%',
  },
  detailText: {
    marginBottom: '5%',
    color: 'black',
  },
  shippingDetailsSubSection: {
    paddingTop: '3%',
    paddingHorizontal: '15%',
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
