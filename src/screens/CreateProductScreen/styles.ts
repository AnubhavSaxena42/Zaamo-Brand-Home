import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  createProductContainer: {
    flex: 1,
  },
  createProductScrollViewContainer: {
    backgroundColor: 'rgba(229, 229, 229, 0.2);',
  },
  colorModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorModalHeader: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: '5%',
  },
  colorModalHeaderText: {
    marginVertical: '5%',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  colorModalButton: {
    alignSelf: 'center',
    backgroundColor: 'black',
    width: '30%',
    marginVertical: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  colorModalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  createProductHeaderContainer: {
    height: 65,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageStyle: {
    width: 100,
    height: '100%',
  },
  cameraIconContainer: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taggedVariantsContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginVertical: '4%',
  },
  selectedColorContainer: {
    height: 40,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'white',
    marginTop: '2%',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: '2%',
    marginBottom: '2%',
  },
  pickColorButton: {
    height: '80%',
    width: '30%',
    borderRadius: 4,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickColorButtonText: {
    color: 'white',
    fontSize: 12,
  },
  sizeValuesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: '4%',
  },
  createProductHeaderText: {
    color: 'black',
    fontSize: 22,
    fontWeight: '500',
  },
  errorMessageContainer: {
    marginTop: '1%',
  },
  errorMessageText: {
    fontSize: 12,
    color: 'red',
  },
  productDetailsContainer: {
    backgroundColor: 'whitesmoke',
    paddingHorizontal: '5%',
    paddingTop: 10,
  },
  productDetailsHeaderContainer: {},
  headerText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: '3%',
  },
  productNameInputContainer: {},
  labelText: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: '3%',
    color: 'grey',
    marginBottom: '2%',
  },
  imageContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
  },
  productPriceStockInputContainer: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: '2%',
    height: 40,
    color: 'gray',
    backgroundColor: 'white',
  },
  priceInput: {
    borderWidth: 1,
    height: 40,
    color: 'gray',
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: '2%',
    marginRight: '2%',
    backgroundColor: 'white',
  },
  productDescriptionInput: {
    borderWidth: 1,
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: '2%',
    height: 200,
    paddingHorizontal: '3%',
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  stockInput: {
    borderWidth: 1,
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: '2%',
    backgroundColor: 'white',
  },
  priceInputContainer: {
    width: '50%',
  },
  stockInputContainer: {
    width: '50%',
  },
  productDescriptionInputContainer: {},
  selectCategoryContainer: {},
  selectSubCategoryContainer: {},
  codCheckboxContainer: {
    marginVertical: '5%',
  },
  variationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: '5%',
  },
  addVariantsContainer: {
    paddingHorizontal: '5%',
  },
  addVariantsHeaderContainer: {},
  variantNameInputContainer: {},
  variantCheckboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: '5%',
  },
  addVariationButtonContainer: {
    alignItems: 'center',
    marginVertical: '3%',
  },
  addVariationButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '35%',
    padding: '3%',
    borderRadius: 10,
  },
  addVariationButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  nextButtonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingVertical: '3%',
    marginTop: '5%',
  },
  nextButton: {
    backgroundColor: 'black',
    width: '40%',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    borderRadius: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  inputStyle: {
    width: '100%',
    color: 'black',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: '3%',
    marginBottom: 15,
    paddingHorizontal: '3%',
  },
});