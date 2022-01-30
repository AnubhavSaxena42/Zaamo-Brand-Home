import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Clipboard from '@react-native-clipboard/clipboard';
import toastService from '../../services/toast-service';
import {styles} from './styles';
const windowWidth = Dimensions.get('window').width;
const Coupon = ({navigation, coupon}) => {
  return (
    <View style={styles.couponContainer}>
      <View style={styles.couponDiscountValueContainer}>
        <View style={styles.couponDiscountValue}>
          <Text style={styles.couponDiscountValueText}>
            {coupon.discountValueType === 'FIXED' ? 'Rs' : ''}
            {coupon.discountValue}
            {coupon.discountValueType === 'PERCENTAGE' ? '%' : ''}
          </Text>
          <Text style={styles.offText}>Off</Text>
        </View>
      </View>
      <View style={styles.couponInfoContainer}>
        <View style={styles.rowContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.couponNameText}>
            {coupon.name}
          </Text>
          <Text style={styles.couponValidityText}>Available</Text>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.couponCodeContainer}>
            <Text style={styles.couponCodeText}>{coupon.code}</Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(coupon.code);
                toastService.showToast(
                  `Coupon Code Copied:${coupon.code}`,
                  true,
                );
              }}>
              <AntDesign name="copy1" color="black" size={20} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CouponInfoScreen', {
                coupon: coupon,
              })
            }
            style={styles.viewButton}>
            <Text style={{color: 'white'}}>View</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.couponEndDateText}>
          {coupon.endDate ? 'Valid Until 30th March' : ''}
        </Text>
      </View>
    </View>
  );
};

export default Coupon;
