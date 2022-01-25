import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
  View,
} from 'react-native';

const OrderCard = ({navigation, status, isDetails, order}) => {
  const getTheme = status => {
    if (status) {
      if (status === 'In Process') return '#f8cece';
      else if (status === 'Shipped') return '#eee6a1';
      else if (status === 'Delivered') return '#ddfcb6';
      else if (status === 'Cancelled') return '#b5cbed';
      else if (status === 'Return Requested') return 'rgba(180,7,182,0.4)';
      else if (status === 'Return Initiated') return 'rgba(254,72,24,0.4)';
      else if (status == 'Return Completed') return 'rgba(0,163,98,0.5)';
      else if (status === 'Fulfilled') return 'rgba(0,0,0,0.3)';
    } else return 'pink';
  };
  const getTextTheme = status => {
    if (status) {
      if (status === 'In Process') return '#ef3b3b';
      else if (status === 'Shipped') return '#d29f4b';
      else if (status === 'Delivered') return '#4c8305';
      else if (status === 'Cancelled') return '#3b5998';
      else if (status === 'Return Requested') return '#660066';
      else if (status === 'Return Initiated') return 'rgb(254,72,24)';
      else if (status == 'Return Completed') return 'rgb(0,163,98)';
      else if (status === 'Fulfilled') return 'black';
    } else return 'pink';
  };
  console.log('User:', order.user);
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('OrderDetailsScreen', {
          order: order,
          status: status,
        });
      }}
      style={{
        ...styles.orderCardContainer,
        height: isDetails ? 100 : 120,
        borderRightWidth: !isDetails ? 10 : 0,
        borderRightColor: getTheme(status),
      }}>
      {!isDetails && (
        <Image
          source={require('../../assets/images/smugcat.jpg')}
          style={styles.imageStyle}
        />
      )}
      <View style={styles.orderInfo}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{fontSize: 14, color: 'black', fontWeight: '400'}}>
          {order ? `#${order.number}` : '#'}{' '}
          {order?.user ? order.user.firstName : 'Anchal'}{' '}
          {order?.user ? order.user.lastName : 'Sharma'}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: 'rgba(0,0,0,0.5)',
            fontFamily: 'Roboto-Regular',
          }}>
          {order ? order.created : ''}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: isDetails ? '5%' : '20%',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: getTextTheme(status),
              backgroundColor: getTheme(status),
              borderRadius: 5,
              padding: '2%',
              paddingHorizontal: '3%',
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowRadius: 2,
              textShadowOffset: {width: 1, height: 1},
              textAlignVertical: 'center',
              fontFamily: 'Roboto-Regular',
              marginRight: 10,
            }}>
            {status ? status : 'NO STATUS'}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: 'darkslateblue',
              backgroundColor: 'whitesmoke',
              borderRadius: 5,
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowRadius: 2,
              textShadowOffset: {width: 1, height: 1},
              textAlignVertical: 'center',
              fontFamily: 'Roboto-Regular',
            }}>
            {!isDetails &&
              (order?.user
                ? `${order.user.defaultBillingAddress.postalCode}`
                : '110011-Saket')}
          </Text>
        </View>
      </View>
      <View style={styles.priceInfo}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{fontSize: 14, color: 'black', fontWeight: '400'}}>
          ₹{order ? order.total?.net.amount : '???'}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{fontSize: 10, color: 'rgba(0,0,0,0.5)'}}>
          {order ? order.lines?.length : '1'}{' '}
          {order?.lines?.length > 1 ? 'items' : 'item'}
        </Text>
      </View>
    </Pressable>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  orderCardContainer: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRightColor: 'pink',
    borderRadius: 10,
    borderRightWidth: 10,
    backgroundColor: 'white',
    marginVertical: '2%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
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
    flex: 2,
  },
  priceInfo: {
    height: '100%',
    flex: 1,
    paddingTop: '3%',
    paddingRight: '2%',
  },
});
