import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  orderItemContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    marginVertical: '5%',
  },
  fulfillmentModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fulfillmentModalSubContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: '5%',
  },
  fulfillmentModalHeaderText: {
    marginVertical: '5%',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  fulfillmentModalConfirmButton: {
    alignSelf: 'center',
    backgroundColor: 'black',
    width: '30%',
    marginVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  fulfillmentModalConfirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  imageStyle: {
    height: 220,
    width: '30%',
    borderRadius: 10,
  },
  orderInfo: {
    flex: 1,
    paddingHorizontal: '2%',
    paddingVertical: '4%',
    justifyContent: 'space-between',
  },
  namePriceInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  productNameText: {
    fontSize: 14,
    color: 'black',
    width: '80%',
    maxWidth: 150,
  },
  productPriceText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  statusContainer: {
    height: 50,
  },
  statusHeaderText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  statusChangerContainer: {
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
    paddingHorizontal: '2%',
    paddingVertical: '2%',
  },
  statusText: {
    textAlignVertical: 'center',
    color: 'gray',
  },
  statusChangeButton: {
    height: '100%',
    width: 70,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  statusChangeButtonText: {
    color: 'white',
  },
  inputStyle: {
    width: '80%',
    color: 'black',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: '3%',
    marginBottom: 15,
  },
  shippingInputContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '5%',
    justifyContent: 'space-between',
  },
  shippingInput: {
    fontSize: 12,
    color: 'black',
  },
});
