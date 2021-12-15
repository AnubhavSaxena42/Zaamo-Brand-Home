import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';

const OrderCard = ({navigation, isDetails}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OrderDetailsScreen');
      }}
      style={styles.orderCardContainer}>
      {!isDetails && (
        <Image
          source={require('../../assets/images/smugcat.jpg')}
          style={styles.imageStyle}
        />
      )}
      <View style={styles.orderInfo}>
        <Text style={{fontSize: 14, color: 'black'}}>#24304 Anchal Sharma</Text>
        <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.5)'}}>
          28th August 2021
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '20%',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: 'crimson',
              backgroundColor: 'pink',
              borderRadius: 5,
            }}>
            Pending
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: 'darkslateblue',
              backgroundColor: 'whitesmoke',
              borderRadius: 5,
            }}>
            110011-Saket
          </Text>
        </View>
      </View>
      <View style={styles.priceInfo}>
        <Text style={{fontSize: 14, color: 'black'}}>Rs 690</Text>
        <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.5)'}}>1 item</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  orderCardContainer: {
    flexDirection: 'row',
    width: '95%',
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRightColor: 'pink',
    borderRadius: 10,
    borderRightWidth: 10,
    backgroundColor: 'white',
    marginVertical: '2%',
  },
  imageStyle: {
    height: '100%',
    width: '35%',
    borderRadius: 10,
  },
  orderInfo: {
    paddingTop: '3%',
    height: '100%',
    paddingLeft: '2%',
  },
  priceInfo: {
    height: '100%',
    paddingTop: '3%',
    paddingRight: '2%',
  },
});
