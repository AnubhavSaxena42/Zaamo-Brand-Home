import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {GET_KEY_METRICS} from '../../api/queries';
import {styles} from './styles';
const OrdersOverviewCard = ({
  productsSoldTotal,
  shippedOrders,
  deliveredOrders,
  receivedOrders,
}) => {
  return (
    <View style={styles.ordersOverviewContainer}>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>{productsSoldTotal}</Text>
        <Text style={styles.key}>Products Sold</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>{receivedOrders}</Text>
        <Text style={styles.key}>Received</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>{shippedOrders}</Text>
        <Text style={styles.key}>Shipped</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>{deliveredOrders}</Text>
        <Text style={styles.key}>Delivered</Text>
      </View>
    </View>
  );
};

export default OrdersOverviewCard;
