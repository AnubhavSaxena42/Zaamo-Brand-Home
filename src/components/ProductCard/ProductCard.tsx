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
import {styles} from './styles';
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
        <View style={styles.productInfoContainer}>
          <View style={styles.row}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{...styles.rowOneText, width: '50%'}}>
              {product.brandName}
            </Text>
            <Text style={styles.rowOneText}>₹{product.price}</Text>
          </View>
          <View style={styles.row}>
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
        <View style={styles.inventoryInfoContainer}>
          <Text style={styles.inventoryText}>
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
              navigation.navigate('CreateVariantScreen', {
                editVariants: product.variants,
                editInventory: true,
              });
            }}
            style={styles.editButton}>
            <View style={styles.editIcon}>
              <Ionicons name="pencil" size={6} color={'black'} />
            </View>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
      {inCollectionView && (
        <View style={styles.removeButtonContainer}>
          <TouchableOpacity
            activeOpacity={0}
            onPress={() => {
              setProductIdToRemove(product.id);
            }}
            style={styles.removeButton}>
            <View style={styles.editIcon}>
              <Entypo name="minus" size={5} color={'black'} />
            </View>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
};

export default ProductCard;
