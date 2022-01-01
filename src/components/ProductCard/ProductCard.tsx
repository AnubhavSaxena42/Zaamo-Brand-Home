import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import toastService from '../../services/toast-service';
const ProductCard = ({product}) => {
  return (
    <View style={styles.productCardContainer}>
      <ImageBackground
        style={styles.imageStyle}
        source={{uri: product.thumbnail}}>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(product.id);
            toastService.showToast(
              `Product ID copied to clipboard:  ${product.id}  `,
              true,
            );
          }}
          style={styles.iconContainer}>
          <Entypo name="link" color={'gray'} size={15} />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            paddingHorizontal: '3%',
            bottom: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{...styles.rowOneText, width: '50%'}}>
              {product.brandName}
            </Text>
            <Text style={styles.rowOneText}>Rs.{product.price}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{...styles.rowTwoText, width: '70%'}}>
              {product.name}
            </Text>
            <Text
              style={{
                ...styles.rowTwoText,
                textDecorationLine: 'line-through',
              }}>
              Rs.750
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: '5%',
          paddingVertical: '4%',
        }}>
        <Text style={{color: 'black', fontSize: 12}}>
          Inventory:
          <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
            4
          </Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            toastService.showToast('Feature in Development', true);
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            paddingHorizontal: '3%',
            borderRadius: 10,
          }}>
          <View style={styles.editIcon}>
            <Ionicons name="pencil" size={5} color={'black'} />
          </View>
          <Text style={{color: 'white'}}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCardContainer: {
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    marginVertical: '2%',
  },
  editIcon: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  rowOneText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },
  rowTwoText: {
    fontSize: 12,
    color: 'white',
  },
  iconContainer: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#e1cab6',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  imageStyle: {
    height: 220,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
