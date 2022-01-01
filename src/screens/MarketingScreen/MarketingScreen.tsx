import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import Coupon from '../../components/Coupon/Coupon';
import Header from '../../components/Header';
import {useSelector} from 'react-redux';
const MarketingScreen = ({navigation}) => {
  const vouchers = useSelector(state => state.store.vouchers);
  return (
    <ScrollView style={styles.marketingContainer}>
      <Header
        tag={'Marketing'}
        fontSize={22}
        icon={true}
        onPress={() => navigation.navigate('CreateCouponScreen')}
      />
      {vouchers.map(coupon => (
        <Coupon navigation={navigation} key={coupon.id} coupon={coupon} />
      ))}
    </ScrollView>
  );
};

export default MarketingScreen;

const styles = StyleSheet.create({
  marketingContainer: {
    flex: 1,
  },
});
