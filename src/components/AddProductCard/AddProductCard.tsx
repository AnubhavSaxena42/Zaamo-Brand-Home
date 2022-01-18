import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Pressable,
  ImageBackground,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
const AddProductCard = ({
  product,
  navigation,
  setSelectedProducts,
  selectedProducts,
}) => {
  const selectionHandler = () => {
    console.log('selectedProducts:', selectedProducts);
    console.log('Product to add:', product);
    if (selectedProducts.includes(product.id)) {
      console.log('In selected Case');
      const newSelectedProducts = selectedProducts.filter(selectedProduct => {
        return selectedProduct !== product.id;
      });
      setSelectedProducts(newSelectedProducts);
      console.log('New Selected Products:', newSelectedProducts);
    } else {
      console.log('In adding case');
      const addSelectedProducts = [...selectedProducts, product.id];
      setSelectedProducts(addSelectedProducts);
      console.log('New Selected Products:', addSelectedProducts);
    }
  };
  return (
    <Pressable
      onPress={() => navigation.navigate('ProductPage', {product: product})}
      style={styles.addProductCardContainer}>
      <ImageBackground
        style={styles.imageStyle}
        resizeMode="cover"
        source={{uri: product.thumbnail}}>
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={selectionHandler}
          style={styles.iconContainer}>
          {selectedProducts.includes(product.id) ? (
            <Entypo name="check" color={'black'} size={15} />
          ) : (
            <Entypo name="plus" color={'black'} size={15} />
          )}
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
    </Pressable>
  );
};

export default AddProductCard;

const styles = StyleSheet.create({
  addProductCardContainer: {
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    marginVertical: '2%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
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
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  imageStyle: {
    height: 270,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
