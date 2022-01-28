import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
const imageW = width * 0.9;
const imageH = imageW * 1.2;

export const styles = StyleSheet.create({
  productPageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 2,
    height: 40,
    borderRadius: 10,
    left: 10,
    top: 10,
  },
  paginationDotsContainer: {
    position: 'absolute',
    right: '3%',
    top: '35%',
    zIndex: 2,
  },
  carouselItemContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImageStyle: {
    marginBottom: '25%',
    width: width,
    height: imageH,
    resizeMode: 'cover',
  },
  bottomSheetHandleStyle: {
    backgroundColor: 'white',
    borderRadius: 100,
    zIndex: 5,
  },
  contentContainer: {
    flex: 1,
    zIndex: 2,
    elevation: 1,
    backgroundColor: 'white',
  },
  productOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    paddingBottom: '5%',
  },
  bottomSheetHeadingContainer: {
    maxWidth: '75%',
  },
  brandNameText: {
    fontSize: 20,
    letterSpacing: 1,
    maxWidth: '100%',
    fontWeight: '400',
    color: 'black',
  },
  productNameText: {
    fontSize: 14,
    maxWidth: '100%',
    fontWeight: '400',
    color: 'black',
  },
  productPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  productDetailsContainer: {
    paddingHorizontal: '3%',
    marginTop: '2%',
  },
  productDetailsLabel: {
    color: 'black',
    fontSize: 16,
  },
  variantsContainer: {
    flexDirection: 'row',
    marginVertical: '2%',
    width: '100%',
    flexWrap: 'wrap',
  },
  variantBox: {
    marginRight: '5%',
    marginBottom: '2%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    paddingVertical: '1%',
    maxWidth: 100,
    paddingHorizontal: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variantNameText: {
    color: 'black',
    fontSize: 14,
  },
  productDescriptionText: {
    color: 'gray',
    fontSize: 14,
  },
});
