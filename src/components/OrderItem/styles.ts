import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  orderItemContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    marginVertical: '2%',
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
    height: 150,
    width: '30%',
    borderRadius: 10,
  },
  orderInfo: {
    flex: 1,
    paddingHorizontal: '2%',
    paddingVertical: '2%',
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
  },
  productPriceText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  statusContainer: {
    position: 'absolute',
    bottom: '20%',
    marginLeft: '3%',
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
});
