import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import Coupon from '../../components/Coupon/Coupon';
import Header from '../../components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {setStoreVouchers} from '../../redux/reducers/storeReducer';
import {useQuery} from '@apollo/client';
import {GET_COUPONS} from '../DashboardScreen/queries';
const MarketingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const couponResponse = useQuery(GET_COUPONS, {
    pollInterval: 1000,
  });
  useEffect(() => {
    console.log('data update');
    if (couponResponse.data) {
      const newCoupons = couponResponse.data.vouchers.edges.map(({node}) => {
        return node;
      });
      dispatch(setStoreVouchers(newCoupons));
    }
  }, [couponResponse.data]);

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
