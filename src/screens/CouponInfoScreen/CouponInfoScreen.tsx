import React from 'react';
import {StyleSheet, Text, Image, Dimensions, View} from 'react-native';
import Coupon from '../../components/Coupon/Coupon';
import CouponOverview from '../../components/CouponOverview/CouponOverview';
const windowWidth = Dimensions.get('window').width;
const CouponInfoScreen = ({navigation, route}) => {
  return (
    <View style={styles.couponInfoContainer}>
      <Image
        source={require('../../assets/images/DashboardEllipse.png')}
        style={{
          height: 400,
          width: windowWidth,
          zIndex: 1,
          position: 'absolute',
          top: -80,
        }}
      />
      <Text
        style={{
          color: 'white',
          zIndex: 2,
          marginTop: '5%',
          fontSize: 15,
          paddingHorizontal: '5%',
          marginBottom: '8%',
        }}>
        Marketing
      </Text>
      <CouponOverview coupon={route.params.coupon} />
      <View
        style={{
          paddingVertical: '4%',
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: '4%',
          backgroundColor: 'white',
          width: '90%',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
        }}>
        <Text style={{textAlign: 'center', marginVertical: '2%', fontSize: 16}}>
          Description
        </Text>
        <Text style={{textAlign: 'center', marginVertical: '1%', fontSize: 14}}>
          {route.params.coupon.metadata[0].value}
        </Text>
      </View>
    </View>
  );
};

export default CouponInfoScreen;

const styles = StyleSheet.create({
  couponInfoContainer: {
    flex: 1,
  },
});
