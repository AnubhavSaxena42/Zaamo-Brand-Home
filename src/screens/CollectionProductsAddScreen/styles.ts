import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  collectionProductsAddScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  brandSelectModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandSelectModalSubContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: '5%',
  },
  selectBrandHeaderText: {
    marginVertical: '5%',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  selectBrandModalConfirmButton: {
    alignSelf: 'center',
    backgroundColor: 'black',
    width: '30%',
    marginVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  selectBrandModalConfirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '2%',
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },
  confirmButton: {
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'black',
  },
  selectBrandButtonContainer: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectBrandButton: {
    borderColor: 'rgba(0,0,0,1)',
    borderWidth: 1,
    height: 40,
    width: 300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1.0,
  },
  selectBrandButtonText: {
    color: 'black',
  },
});
