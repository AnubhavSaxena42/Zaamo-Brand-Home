import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  addProductCardContainer: {
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    marginVertical: '2%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
  },
  rowOneText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 0.3,
    textShadowOffset: {width: 1, height: 1},
  },
  rowTwoText: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: 'white',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 0.3,
    textShadowOffset: {width: 1, height: 1},
  },

  iconContainer: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  imageStyle: {
    height: 270,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  productInfoContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: '3%',
    bottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
