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
import {styles} from './styles';
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
        <View style={styles.productInfoContainer}>
          <View style={styles.rowContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{...styles.rowOneText, width: '50%'}}>
              {product.brandName}
            </Text>
            <Text style={styles.rowOneText}>Rs.{product.price}</Text>
          </View>
          <View style={styles.rowContainer}>
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
