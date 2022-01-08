import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';

const OrderCard = ({navigation, isDetails, order}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OrderDetailsScreen', {
          order: order,
        });
      }}
      style={styles.orderCardContainer}>
      {!isDetails && (
        <Image
          source={require('../../assets/images/smugcat.jpg')}
          style={styles.imageStyle}
        />
      )}
      <View style={styles.orderInfo}>
        <Text style={{fontSize: 14, color: 'black'}}>
          {order ? `#${order.number}` : '#'}{' '}
          {order?.user ? order.user.firstName : 'Anchal'}{' '}
          {order?.user ? order.user.lastName : 'Sharma'}
        </Text>
        <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.5)'}}>
          {order ? order.created : ''}
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
            {order?.user
              ? `${order.user.defaultBillingAddress.postalCode}`
              : '110011-Saket'}
          </Text>
        </View>
      </View>
      <View style={styles.priceInfo}>
        <Text style={{fontSize: 14, color: 'black'}}>
          {order ? order.total.net.currency : 'Rs'}
          {order ? order.total.net.amount : '???'}
        </Text>
        <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.5)'}}>
          {order ? order.lines.length : '1'}{' '}
          {order?.lines.length > 1 ? 'items' : 'item'}
        </Text>
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
