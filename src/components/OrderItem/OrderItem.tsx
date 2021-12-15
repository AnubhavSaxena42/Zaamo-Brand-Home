import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import Dropdown from '../Dropdown';

const OrderItem = () => {
  return (
    <View style={styles.orderItemContainer}>
      <Image
        source={require('../../assets/images/smugcat.jpg')}
        style={styles.imageStyle}
      />
      <View style={styles.orderInfo}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '2%',
          }}>
          <Text style={{fontSize: 14, color: 'black'}}>White Floral Dress</Text>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              fontWeight: 'bold',
              fontFamily: 'Roboto-Bold',
            }}>
            Rs 772
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: '2%'}}>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              backgroundColor: 'ghostwhite',
              paddingHorizontal: '3%',
              borderRadius: 5,
              marginRight: '3%',
            }}>
            Black
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              backgroundColor: 'ghostwhite',
              paddingHorizontal: '2%',
              borderRadius: 5,
            }}>
            L
          </Text>
        </View>
        <View style={{position: 'absolute', bottom: '20%', marginLeft: '3%'}}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
            Order Status
          </Text>
          <Text>Dropdown here</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItemContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',

    marginVertical: '2%',
  },
  imageStyle: {
    height: 150,
    width: '30%',
    borderRadius: 10,
  },
  orderInfo: {
    flex: 1,
    paddingHorizontal: '2%',
    paddingVertical: '2%',
  },
});
