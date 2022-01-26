import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Coupon from '../../components/Coupon/Coupon';
import CouponOverview from '../../components/CouponOverview/CouponOverview';
const windowWidth = Dimensions.get('window').width;
const CouponInfoScreen = ({navigation, route}) => {
  console.log(route.params.coupon);
  return (
    <SafeAreaView style={{flex:1}}>
    
    <ScrollView
    
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow:1,
        paddingBottom:200,
        
      }}>
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
      <View
        style={{
          flexDirection: 'row',
          marginTop: '5%',
          marginBottom: '8%',
          alignItems: 'center',
          paddingLeft: '2%',
          justifyContent: 'center',
          zIndex:2,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{zIndex: 2, position: 'absolute', left: 10}}>
          <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            zIndex: 2,
            fontFamily: 'Roboto-Bold',
            fontSize: 22,
            paddingHorizontal: '5%',
          }}>
          Marketing
        </Text>
      </View>
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
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'gray',
            marginVertical: '2%',
            fontFamily:'Roboto-Black',
            fontSize: 14,
          }}>
          Description
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            marginVertical: '1%',
            fontSize: 14,
          }}>
          {route.params.coupon.metadata[0].value}
        </Text>
      </View>
      <View
        style={{
          paddingVertical: '4%',
          borderRadius: 10,
          alignSelf: 'center',
          marginTop: '4%',
          paddingHorizontal: '5%',
          backgroundColor: 'white',
          width: '90%',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
        }}>
        <Text style={{fontFamily: 'Roboto-Black', color: 'gray', fontSize: 14}}>
          Applicable Products
        </Text>
        {route.params.coupon.products.edges.map(({node}) => {
          return (
            <View
              key={node.code}
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: '2%',
              }}>
              <Image
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 5,
                  marginRight: '4%',
                  overflow: 'hidden',
                }}
                source={{uri: node.thumbnail?.url ? node.thumbnail?.url : ''}}
              />
              <Text style={{flex: 1, color: 'black'}}>{node.name}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
    
    </SafeAreaView>
  );
};

export default CouponInfoScreen;

const styles = StyleSheet.create({
  couponInfoContainer: {
    flex: 1,
  },
});
