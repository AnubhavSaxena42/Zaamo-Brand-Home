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
const windowWidth = Dimensions.get('window').width;
const Coupon = ({navigation, coupon}) => {
  return (
    <View
      style={{
        width: '99%',
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 130,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: '2%',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '30%',
          borderRightWidth: 3,
          borderRightColor: 'rgba(0,0,0,0.2)',
          borderStyle: 'dashed',
        }}>
        <View
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,

            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingHorizontal: '15%',
              color: 'white',
              fontSize: 16,
              textAlign: 'center',
            }}>
            {coupon.discountValueType === 'FIXED' ? 'Rs' : ''}
            {coupon.discountValue}
            {coupon.discountValueType === 'PERCENTAGE' ? '%' : ''}
          </Text>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 14}}>
            Off
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '60%',
          height: '60%',
          marginLeft: '5%',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 14, color: 'gray'}}>{coupon.name}</Text>
          <Text style={{fontSize: 12, color: '#3eb988', fontWeight: '700'}}>
            Available
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: '#ffeee8',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: '65%',
              paddingHorizontal: '2%',
              height: 35,
              borderRadius: 5,
            }}>
            <Text style={{color: 'black'}}>{coupon.code}</Text>
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
            style={{
              width: 70,
              height: 25,
              borderRadius: 5,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>View</Text>
          </TouchableOpacity>
        </View>
        <Text>{coupon.endDate ? 'Valid Until 30th March' : ''}</Text>
      </View>
    </View>
  );
};

export default Coupon;

const styles = StyleSheet.create({});
