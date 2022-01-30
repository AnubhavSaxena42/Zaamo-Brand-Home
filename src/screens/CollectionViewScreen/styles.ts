import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  collectionViewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  collectionViewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  backButton: {
    zIndex: 2,
    position: 'absolute',
    left: 10,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 24,
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
  addProductsButton: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '2%',
  },
  addProductsButtonText: {
    color: 'white',
  },
  imageStyle: {
    width: '100%',
    height: 150,
  },
});
