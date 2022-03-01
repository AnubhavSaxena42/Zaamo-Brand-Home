import {useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {GET_KEY_METRICS} from '../../api/queries';
import {styles} from './styles';
const OrdersOverviewCard = () => {
  const [productsSoldTotal, setProductsSoldTotal] = useState('-');
  const [shippedOrders, setShippedOrders] = useState('-');
  const [deliveredOrders, setDeliveredOrders] = useState('-');
  const [receivedOrders, setReceivedOrders] = useState('-');
  const brandID = useSelector(state => state.user?.authorisedBrands[0]?.id);
  const {data, loading, error} = useQuery(GET_KEY_METRICS, {
    variables: {
      brands: [brandID],
    },
  });
  useEffect(() => {
    if (data) {
      const {
        deliveredOrderCount,
        productsSold,
        receivedOrderCount,
        shippedOrderCount,
      } = data?.masterDashboardKpi;
      setProductsSoldTotal(productsSold);
      setShippedOrders(shippedOrderCount);
      setDeliveredOrders(deliveredOrderCount);
      setReceivedOrders(receivedOrderCount);
    }
  }, [data]);

  return (
    <View style={styles.ordersOverviewContainer}>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>{loading ? '-' : productsSoldTotal}</Text>
        <Text style={styles.key}>Products Sold</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>{loading ? '-' : receivedOrders}</Text>
        <Text style={styles.key}>Received</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>{loading ? '-' : shippedOrders}</Text>
        <Text style={styles.key}>Shipped</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>{loading ? '-' : deliveredOrders}</Text>
        <Text style={styles.key}>Delivered</Text>
      </View>
    </View>
  );
};

export default OrdersOverviewCard;
