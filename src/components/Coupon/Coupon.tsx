import React from 'react';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;
const Coupon = () => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        height: 130,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: '2%',
      }}>
      <View
        style={{
          height: 25,
          width: 40,
          zIndex: 2,
          top: 0,
          left: '25%',
          position: 'absolute',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: 'whitesmoke',
        }}></View>
      <View
        style={{
          height: 25,
          width: 40,
          bottom: 0,
          left: '25%',
          position: 'absolute',
          zIndex: 2,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: 'whitesmoke',
        }}></View>
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
              fontSize: 28,
              textAlign: 'center',
            }}>
            70%
            <Text style={{textAlign: 'center', color: 'white', fontSize: 14}}>
              Off
            </Text>
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
          <Text style={{fontSize: 14}}>70% off for first time buyer</Text>
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
              height: 25,
              borderRadius: 5,
            }}>
            <Text>SAVE70NEWBUYER</Text>
            <AntDesign name="copy1" color="black" size={12} />
          </View>
          <View
            style={{
              width: 70,
              height: 25,
              borderRadius: 5,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>View</Text>
          </View>
        </View>
        <Text>Valid Until 30th March</Text>
      </View>
    </View>
  );
};

export default Coupon;

const styles = StyleSheet.create({});
