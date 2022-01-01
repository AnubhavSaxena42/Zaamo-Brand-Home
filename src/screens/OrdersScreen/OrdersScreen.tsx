//@ts-nocheck
import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Text,
  View,
} from 'react-native';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrdersOverviewCard from '../../components/OrdersOverviewCard/OrdersOverviewCard';
import {useQuery} from '@apollo/client';
import {GET_ORDERS} from './queries';
import {useSelector} from 'react-redux';
import authService from '../../services/auth-service';
const OrdersScreen = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const {data, error, loading} = useQuery(GET_ORDERS);
  useEffect(() => {
    if (data) {
      const orders = data.orders.edges.filter(
        ({node}) => node.lines.length !== 0,
      );
      console.log('Orders:', orders);
    }
  }, [data]);
  console.log(data, error, loading);
  return (
    <View style={styles.ordersContainer}>
      <Text
        style={{
          zIndex: 2,
          color: 'white',
          fontSize: 16,
          textAlign: 'center',
          marginTop: '5%',
        }}>
        Orders
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
          zIndex: 2,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: '10%',
          paddingBottom: '5%',
        }}>
        <OrdersOverviewCard />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          zIndex: 2,
          marginTop: '5%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <OrderCard navigation={navigation} />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  ordersContainer: {
    flex: 1,
  },
});
