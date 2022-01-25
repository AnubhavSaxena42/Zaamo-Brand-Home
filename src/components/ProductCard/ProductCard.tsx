import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import toastService from '../../services/toast-service';
import {useDispatch, useSelector} from 'react-redux';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
const ProductCard = ({
  product,
  navigation,
  inCollectionView,
  setProductIdToRemove,
}) => {
  const storeUrl = useSelector(state => state.store.storeInfo.storeUrl);
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => {
        dispatch(setLoaderStatus(true));
        navigation.navigate('ProductPage', {product: product});
        dispatch(setLoaderStatus(false));
      }}
      style={styles.productCardContainer}>
      <ImageBackground
        style={styles.imageStyle}
        source={{
          uri: product.thumbnail,
        }}>
        <TouchableOpacity
          activeOpacity={0}
          onPress={() => {
            Clipboard.setString(storeUrl + '/products/' + product.slug);
            toastService.showToast(
              `Product URL copied to clipboard:  ${
                storeUrl + '/products/' + product.slug
              }  `,
              true,
            );
          }}
          style={styles.iconContainer}>
          <Entypo name="link" color={'rgba(0,0,0,0.6)'} size={15} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            paddingHorizontal: '5%',
            bottom: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{...styles.rowOneText, width: '50%'}}>
              {product.brandName}
            </Text>
            <Text style={styles.rowOneText}>₹{product.price}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{...styles.rowTwoText, width: '70%'}}>
              {product.name}
            </Text>
            {product.priceUndiscounted > product.price && (
              <Text
                style={{
                  ...styles.rowTwoText,
                  textDecorationLine: 'line-through',
                }}>
                ₹{product.priceUndiscounted}
              </Text>
            )}
          </View>
        </View>
      </ImageBackground>
      {!inCollectionView && (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '7%',
            paddingVertical: '4%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              fontFamily: 'Roboto-Regular',
            }}>
            Inventory:{' '}
            <Text
              style={{color: 'black', fontSize: 14, fontFamily: 'Roboto-Bold'}}>
              4
            </Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => {
              console.log('Product:', JSON.stringify(product));
              toastService.showToast('Feature in Development', true);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              paddingHorizontal: '4%',
              paddingVertical: '2%',
              borderRadius: 10,
            }}>
            <View style={{...styles.editIcon}}>
              <Ionicons name="pencil" size={6} color={'black'} />
            </View>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontFamily: 'Roboto-Regular',
              }}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {inCollectionView && (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: '5%',
            paddingVertical: '4%',
          }}>
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => {
              setProductIdToRemove(product.id);
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              paddingHorizontal: '5%',
              paddingVertical: '2%',
              borderRadius: 10,
            }}>
            <View style={styles.editIcon}>
              <Entypo name="minus" size={5} color={'black'} />
            </View>
            <Text style={{color: 'white'}}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
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
});
