import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  View,
  ScrollView,
} from 'react-native';

import OrderCard from '../../components/OrderCard/OrderCard';
import OrderItem from '../../components/OrderItem/OrderItem';

const windowWidth = Dimensions.get('window').width;
const OrderDetailsScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.orderDetailsContainer}>
      <Text
        style={{
          zIndex: 2,
          color: 'white',
          fontSize: 16,
          textAlign: 'center',
          marginTop: '5%',
        }}>
        Order Details
      </Text>
      <Image
        source={require('../../assets/images/DashboardEllipse.png')}
        style={{
          height: 400,
          width: windowWidth,
          zIndex: 1,
          position: 'absolute',
          top: -250,
        }}
      />
      <View
        style={{
          width: '100%',
          zIndex: 2,
          alignItems: 'center',
          marginTop: '12%',
        }}>
        <OrderCard navigation={navigation} isDetails={true} />
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.orderDetailsSection}>
          <Text style={styles.headerText}>Order Details</Text>
          <OrderItem />
          <OrderItem />
        </View>
        <View style={styles.userDetailsSection}>
          <View style={{paddingTop: '3%'}}>
            <Text style={styles.headerText}>User Details</Text>
            <Text style={styles.detailText}>Anchal Sharma</Text>
            <Text style={styles.detailText}>2 items</Text>
          </View>
          <View style={{paddingTop: '3%', paddingHorizontal: '15%'}}>
            <Text style={styles.headerText}>Shipping Details</Text>
            <Text style={styles.detailText}>
              D-81,Saket,South Delhi,Delhi,India-110059
            </Text>
            <Text style={styles.detailText}>9599243067</Text>
            <Text style={styles.detailText}>anchal_20sharma@gmail.com</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrdersScreen')}
          style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  orderDetailsContainer: {
    flex: 1,
    width: '100%',
  },
  orderDetailsSection: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: '3%',
  },
  userDetailsSection: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: '3%',
  },
  headerText: {
    color: 'black',
    fontWeight: '500',
    marginBottom: '3%',
  },
  detailText: {
    marginBottom: '5%',
  },
  button: {
    marginBottom: '10%',
    height: 35,
    borderRadius: 10,
    marginTop: '10%',
    width: '25%',
    alignSelf: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
