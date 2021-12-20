import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import Coupon from '../../components/Coupon/Coupon';
import Header from '../../components/Header';
const MarketingScreen = () => {
  return (
    <ScrollView style={styles.marketingContainer}>
      <Header />
      <Coupon />
      <Coupon />
      <Coupon />
      <Coupon />
      <Coupon />
      <Coupon />
      <Coupon />
      <Coupon />
      <Coupon />
    </ScrollView>
  );
};

export default MarketingScreen;

const styles = StyleSheet.create({
  marketingContainer: {
    flex: 1,
  },
});
