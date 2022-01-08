import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import toastService from '../../services/toast-service';
const CouponOverview = ({coupon}) => {
  return (
    <View style={styles.couponOverviewContainer}>
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: 'rgba(0,0,0,0.5)',
          borderStyle: 'dashed',
        }}>
        <Text
          style={{
            width: '100%',
            backgroundColor: '#00a362',
            textAlign: 'center',
            color: 'white',
            fontSize: 14,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingVertical: '1%',
          }}>
          Available
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: '4%',
            marginBottom: '1%',
            fontSize: 22,
            color: 'black',
          }}>
          {coupon.name}
        </Text>
        {coupon.metadata[1] ? (
          <Text style={{textAlign: 'center', marginBottom: '10%'}}>
            {coupon.metadata[1].value}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            color: 'black',
            marginVertical: '2%',
          }}>
          {coupon.code}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(coupon.code);
            toastService.showToast(
              `Code copied to clipboard:${coupon.code}`,
              true,
            );
          }}
          style={{
            flexDirection: 'row',
            backgroundColor: 'black',
            alignSelf: 'center',
            width: '90%',
            borderRadius: 5,
            paddingVertical: '2%',
            justifyContent: 'center',
            marginVertical: '2%',
          }}>
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              color: 'white',
            }}>
            Copy Code
          </Text>
        </TouchableOpacity>
        {coupon.endDate && (
          <Text
            style={{marginTop: '2%', marginBottom: '10%', alignSelf: 'center'}}>
            Valid Until 30th March
          </Text>
        )}
      </View>
    </View>
  );
};

export default CouponOverview;

const styles = StyleSheet.create({
  couponOverviewContainer: {
    width: '90%',
    borderRadius: 10,
    minHeight: '40%',
    zIndex: 2,
    backgroundColor: 'white',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
