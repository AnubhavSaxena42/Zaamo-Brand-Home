import React from 'react';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
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
          height: 80,
          width: 80,
          borderRadius: 40,
          marginLeft: '5%',
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{paddingHorizontal: '15%', color: 'white', fontSize: 28}}>
          70%
          <Text style={{textAlign: 'center', color: 'white', fontSize: 14}}>
            Off
          </Text>
        </Text>
      </View>
      <View
        style={{
          width: '60%',
          height: '60%',
          marginLeft: '10%',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 14}}>70% off for first time buyer</Text>
          <Text style={{fontSize: 12}}>Available</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text>SAVE70NEWBUYER</Text>
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
