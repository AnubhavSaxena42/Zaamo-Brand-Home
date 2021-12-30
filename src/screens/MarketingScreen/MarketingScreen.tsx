import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import Coupon from '../../components/Coupon/Coupon';
import Header from '../../components/Header';
import {useQuery} from '@apollo/client';
import {GET_COUPONS} from './queries';

const MarketingScreen = ({navigation}) => {
  const {data, error, loading} = useQuery(GET_COUPONS);
  console.log(data, error, loading);
  console.log('update');
  return (
    <ScrollView style={styles.marketingContainer}>
      <Header
        tag={'Marketing'}
        fontSize={22}
        icon={true}
        onPress={() => navigation.navigate('CreateCouponScreen')}
      />
      <Coupon navigation={navigation} />
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
