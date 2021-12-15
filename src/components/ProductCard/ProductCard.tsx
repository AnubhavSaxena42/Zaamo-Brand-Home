import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ProductCard = () => {
  return (
    <View style={styles.productCardContainer}>
      <ImageBackground
        style={styles.imageStyle}
        source={require('../../assets/images/smugcat.jpg')}>
        <View style={styles.iconContainer}>
          <Entypo name="link" color={'gray'} size={15} />
        </View>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            paddingHorizontal: '3%',
            bottom: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.rowOneText}>Levis</Text>
            <Text style={styles.rowOneText}>Rs.540</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.rowTwoText}>Cotton Yellow Hoodie</Text>
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
        <View
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
        </View>
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
