import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import toastService from '../../services/toast-service';
import {styles} from './styles';
const CouponOverview = ({coupon}) => {
  return (
    <View style={styles.couponOverviewContainer}>
      <View style={styles.couponInfoContainer}>
        <Text style={styles.couponValidityText}>Available</Text>
        <Text style={styles.couponNameText}>{coupon.name}</Text>
        {coupon.metadata[1] ? (
          <Text
            style={{textAlign: 'center', color: 'gray', marginBottom: '10%'}}>
            {coupon.metadata[1].value}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <View>
        <Text style={styles.couponCodeText}>{coupon.code}</Text>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(coupon.code);
            toastService.showToast(
              `Code copied to clipboard:${coupon.code}`,
              true,
            );
          }}
          style={styles.copyCodeButton}>
          <Text style={styles.copyCodeText}>Copy Code</Text>
        </TouchableOpacity>
        {coupon.endDate && (
          <Text style={styles.codeEndDateText}>Valid Until 30th March</Text>
        )}
      </View>
    </View>
  );
};

export default CouponOverview;
