import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const OrdersOverviewCard = () => {
  return (
    <View style={styles.ordersOverviewContainer}>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>27</Text>
        <Text style={styles.key}>Total Orders</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>6</Text>
        <Text style={styles.key}>New Orders</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>2</Text>
        <Text style={styles.key}>Pending</Text>
      </View>
      <View style={styles.metricContainer}>
        <Text style={styles.value}>4</Text>
        <Text style={styles.key}>Delivered</Text>
      </View>
    </View>
  );
};

export default OrdersOverviewCard;

const styles = StyleSheet.create({
  ordersOverviewContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: '8%',
  },
  value: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  key: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
  },
  metricContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
