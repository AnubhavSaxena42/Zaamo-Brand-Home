import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {styles} from './styles';
const OrdersOverviewCard = () => {
  return (
    <View style={styles.ordersOverviewContainer}>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>-</Text>
        <Text style={styles.key}>Total Orders</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>-</Text>
        <Text style={styles.key}>Received</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>-</Text>
        <Text style={styles.key}>In Process</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>-</Text>
        <Text style={styles.key}>Delivered</Text>
      </View>
    </View>
  );
};

export default OrdersOverviewCard;
