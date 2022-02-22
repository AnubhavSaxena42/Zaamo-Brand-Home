import React, {useState, useMemo, useEffect} from 'react';
import {FlatList, SafeAreaView, Text, View, Image} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {tailwind} from '../../core/tailwind';
import Coupon from '../../components/Coupon/Coupon';
import Header from '../../components/Header';
import {useQuery, NetworkStatus} from '@apollo/client';
import {GET_COUPONS} from '../../api/queries';
import {styles} from './styles';
import toastService from '../../services/toast-service';
const MarketingScreen = ({navigation}) => {
  const couponResponse = useQuery(GET_COUPONS, {
    variables: {
      endCursor: '',
    },
    notifyOnNetworkStatusChange: true,
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
      setVouchers(newCoupons);
    }
  }, [couponResponse.data]);

  const refreshing = couponResponse.networkStatus === NetworkStatus.refetch;
  const handleOnEndReached = () => {
    console.log(couponPageInfo.hasNextPage);
    if (couponPageInfo.hasNextPage) {
      console.log(couponPageInfo.endCursor);
      console.log('here');
      couponResponse.fetchMore({
        variables: {
          endCursor: couponPageInfo.endCursor,
        },
      });
    }
  };
  const _renderItem = ({item}) => (
    <Coupon key={item.id} navigation={navigation} coupon={item} />
  );
  const memoizedVoucher = useMemo(() => _renderItem, [vouchers]);

  return (
    <SafeAreaView style={styles.marketingContainer}>
      <Header
        tag={'Marketing'}
        fontSize={22}
        icon={true}
        onPress={() => {
          toastService.showToast('In development', true);
          //navigation.navigate('CreateCouponScreen')
        }}
      />
      <FlatList
        data={vouchers}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: '15%',
          justifyContent: vouchers.length === 0 ? 'center' : 'flex-start',
        }}
        onRefresh={couponResponse.refetch}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !refreshing && !couponResponse.loading
            ? () => (
                <View
                  style={[
                    tailwind(
                      'bg-white mt-1 mx-10   rounded border border-gray-400 flex-row items-center justify-center',
                    ),
                    {},
                  ]}>
                  <Image
                    style={{
                      width: 60,
                      height: 55,
                    }}
                    source={require('../../assets/images/voucher.png')}
                  />
                  <Text
                    style={tailwind(
                      'text-sm font-semibold text-center px-6 py-5 text-gray-600 ',
                    )}>
                    No Vouchers Found
                  </Text>
                </View>
              )
            : null
        }
        ListFooterComponent={
          !refreshing && couponResponse.loading
            ? () => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <BarIndicator size={30} count={5} color="black" />
                  </View>
                );
              }
            : null
        }
        keyExtractor={item => item.id}
        renderItem={memoizedVoucher}
      />
    </SafeAreaView>
  );
};

export default MarketingScreen;
