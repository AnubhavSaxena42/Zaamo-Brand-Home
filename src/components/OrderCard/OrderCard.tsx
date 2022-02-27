import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Pressable,
  View,
} from 'react-native';
import {styles} from './styles';
const OrderCard = ({navigation, status, isDetails, order}) => {
  const getTheme = status => {
    if (status) {
      if (status === 'Received') return 'purple';
      else if (status === 'In Process') return '#f8cece';
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
      if (status === 'Received') return 'green';
      else if (status === 'In Process') return '#ef3b3b';
      else if (status === 'Shipped') return '#d29f4b';
      else if (status === 'Delivered') return '#4c8305';
      else if (status === 'Cancelled') return '#3b5998';
      else if (status === 'Return Requested') return '#660066';
      else if (status === 'Return Initiated') return 'rgb(254,72,24)';
      else if (status == 'Return Completed') return 'rgb(0,163,98)';
      else if (status === 'Fulfilled') return 'black';
    } else return 'pink';
  };

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
          source={{uri: order.lines[0]?.thumbnail?.url}}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      )}
      <View style={styles.orderInfo}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.orderNumberUserText}>
          {/*order ? `#${order.number}` : '#'*/}{' '}
          {order?.user ? order.shippingAddress?.firstName : ''}{' '}
          {order?.user ? order.shippingAddress?.lastName : ''}
        </Text>
        <Text style={styles.orderDateText}>{order ? order.created : ''}</Text>
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
          <Text style={styles.pinCodeText}>
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
          style={styles.totalPriceText}>
          ₹{order ? order.lines[0]?.totalPrice?.net.amount : '???'}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.noOfItemsText}>
          {order ? order.lines?.length : '1'}{' '}
          {order?.lines?.length > 1 ? 'items' : 'item'}
        </Text>
      </View>
    </Pressable>
  );
};

export default OrderCard;
