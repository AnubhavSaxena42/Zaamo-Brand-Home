import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  orderCardContainer: {
    flexDirection: 'row',
    height: 500,
    width: '95%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRightColor: 'pink',
    borderRadius: 10,
    borderRightWidth: 10,
    backgroundColor: 'white',
    marginVertical: '2%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
  imageStyle: {
    height: '100%',
    width: '35%',
    borderRadius: 10,
  },
  orderNumberUserText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  orderDateText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
    fontFamily: 'Roboto-Regular',
  },
  orderInfo: {
    paddingTop: '3%',
    height: '100%',
    paddingLeft: '2%',
    flex: 2,
  },
  pinCodeText: {
    fontSize: 12,
    color: 'darkslateblue',
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowRadius: 2,
    textShadowOffset: {width: 1, height: 1},
    textAlignVertical: 'center',
    fontFamily: 'Roboto-Regular',
  },
  priceInfo: {
    height: '100%',
    flex: 1,
    paddingTop: '3%',
    paddingRight: '2%',
  },
  totalPriceText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '400',
  },
  noOfItemsText: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.5)',
  },
});
