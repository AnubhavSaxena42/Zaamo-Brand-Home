import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import Coupon from '../../components/Coupon/Coupon';
import Header from '../../components/Header';
import {useQuery} from '@apollo/client';
import {GET_COUPONS} from './queries';

const MarketingScreen = ({navigation}) => {
  const [coupons, setCoupons] = useState([]);
  console.log('update');
  const couponResponse = useQuery(GET_COUPONS);
  useEffect(() => {
    console.log('data update');
    if (couponResponse.data) {
      const newCoupons = couponResponse.data.vouchers.edges.map(({node}) => {
        return node;
      });
      setCoupons(newCoupons);
    }
  }, [couponResponse.data]);
  console.log(coupons);
  return (
    <ScrollView style={styles.marketingContainer}>
      <Header
        tag={'Marketing'}
        fontSize={22}
        icon={true}
        onPress={() => navigation.navigate('CreateCouponScreen')}
      />
      {coupons.map(coupon => (
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
