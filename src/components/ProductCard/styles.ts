import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  productCardContainer: {
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    elevation: 3,
    backgroundColor: 'white',
    marginVertical: '2%',
  },
  productInfoContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: '5%',
    bottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    marginRight: '3%',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  imageStyle: {
    height: 270,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  inventoryInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '7%',
    paddingVertical: '4%',
  },
  inventoryText: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    maxWidth: '60%',
  },
  editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: '4%',
    paddingVertical: '2%',
    borderRadius: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
  },
  removeButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '4%',
  },
  removeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    borderRadius: 10,
  },
  removeButtonText: {
    color: 'white',
  },
});
