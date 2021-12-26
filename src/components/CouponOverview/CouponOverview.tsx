import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CouponOverview = () => {
  return (
    <View style={styles.couponOverviewContainer}>
      <View
        style={{
          width: 20,
          height: 30,
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
          backgroundColor: 'black',
          position: 'absolute',
          left: 0,
          top: '40%',
        }}></View>
      <View
        style={{
          width: 20,
          height: 30,
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
          backgroundColor: 'black',
          position: 'absolute',
          right: 0,
          top: '40%',
        }}></View>
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
          Discount 70% Off
        </Text>
        <Text style={{textAlign: 'center', marginBottom: '10%'}}>
          For first time buyers
        </Text>
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            color: 'black',
            marginVertical: '2%',
          }}>
          SAVE70NEWBUYER
        </Text>
        <View
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
        </View>
        <Text
          style={{marginTop: '2%', marginBottom: '10%', alignSelf: 'center'}}>
          Valid Until 30th March
        </Text>
      </View>
    </View>
  );
};

export default CouponOverview;

const styles = StyleSheet.create({
  couponOverviewContainer: {
    width: '90%',
    borderRadius: 10,
    zIndex: 2,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
