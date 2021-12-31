import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
const AddProductCard = ({product, setSelectedProducts, selectedProducts}) => {
  const selectionHandler = () => {
    if (selectedProducts.includes(product.id)) {
      const newSelectedProducts = selectedProducts.filter(selectedProduct => {
        console.log(selectedProduct, product.id);
        return selectedProduct !== product.id;
      });

      setSelectedProducts(newSelectedProducts);
    } else {
      const addSelectedProducts = [...selectedProducts, product.id];
      setSelectedProducts(addSelectedProducts);
    }
  };
  return (
    <View style={styles.addProductCardContainer}>
      <ImageBackground
        style={styles.imageStyle}
        source={{uri: product.thumbnail}}>
        <TouchableOpacity
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
    </View>
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
    backgroundColor: 'white',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  imageStyle: {
    height: 250,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
