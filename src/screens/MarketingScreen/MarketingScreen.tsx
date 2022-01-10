import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import Coupon from '../../components/Coupon/Coupon';
import Header from '../../components/Header';
import {useSelector, useDispatch} from 'react-redux';
import {setStoreVouchers} from '../../redux/reducers/storeReducer';
import {useQuery} from '@apollo/client';
import {GET_COUPONS} from '../DashboardScreen/queries';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
const MarketingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const couponResponse = useQuery(GET_COUPONS, {
    variables: {
      endCursor: '',
    },
  });
  const [vouchers, setVouchers] = useState([]);
  const [couponPageInfo, setCouponPageInfo] = useState({
    endCursor: '',
    hasNextPage: true,
  });
  useEffect(() => {
    if (couponResponse.data) {
      console.log('Coupon Res:', couponResponse.data);
      const newCoupons = couponResponse.data.vouchers.edges.map(({node}) => {
        return node;
      });
      setCouponPageInfo(couponResponse.data.vouchers.pageInfo);
      setVouchers([...vouchers, ...newCoupons]);
    }
  }, [couponResponse.data]);
  useEffect(() => {
    if (couponResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [couponResponse.loading]);
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const fetchMoreVouchers = () => {
    console.log(couponPageInfo.hasNextPage);
    if (couponPageInfo.hasNextPage) {
      console.log(couponPageInfo.endCursor);
      console.log('here');
      couponResponse.refetch({
        endCursor: couponPageInfo.endCursor,
      });
    }
  };
  return (
    <ScrollView
      style={styles.marketingContainer}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          fetchMoreVouchers();
        }
      }}>
      <Header
        tag={'Marketing'}
        fontSize={22}
        icon={true}
        onPress={() => navigation.navigate('CreateCouponScreen')}
      />
      {vouchers.map(coupon => (
        <Coupon key={coupon.id} navigation={navigation} coupon={coupon} />
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
