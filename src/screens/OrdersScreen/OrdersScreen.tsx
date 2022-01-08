//@ts-nocheck
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Text,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrdersOverviewCard from '../../components/OrdersOverviewCard/OrdersOverviewCard';
import {useQuery} from '@apollo/client';
import {GET_ORDERS} from './queries';
import {useSelector} from 'react-redux';
import authService from '../../services/auth-service';
const OrdersScreen = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {data, error, loading, refetch} = useQuery(GET_ORDERS);
  const [brandOrders, setBrandOrders] = useState([]);
  const swiperRef = useRef();
  useEffect(() => {
    if (data) {
      const orders = data.orders.edges.filter(
        ({node}) => node.lines.length !== 0,
      );
      setBrandOrders(orders);
    }
  }, [data]);
  console.log('Brand Orders:', brandOrders);
  console.log('Swiper Ref:', swiperRef.current);
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: '5%',
          }}>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(0);
            }}
            style={{
              marginRight: 8,
              borderBottomWidth: selectedIndex === 0 ? 1 : 0,
              borderColor: 'black',
            }}>
            All Orders
          </Text>

          <Text
            onPress={() => {
              swiperRef.current.scrollTo(1);
            }}
            style={{
              marginRight: 8,
              borderBottomWidth: selectedIndex === 1 ? 1 : 0,
              borderColor: 'black',
            }}>
            Pending
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(2);
            }}
            style={{
              marginRight: 8,
              borderBottomWidth: selectedIndex === 2 ? 1 : 0,
              borderColor: 'black',
            }}>
            Shipped
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(3);
            }}
            style={{
              marginRight: 8,
              borderBottomWidth: selectedIndex === 3 ? 1 : 0,
              borderColor: 'black',
            }}>
            In Process
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(4);
            }}
            style={{
              marginRight: 8,
              borderBottomWidth: selectedIndex === 4 ? 1 : 0,
              borderColor: 'black',
            }}>
            Delivered
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(5);
            }}
            style={{
              marginRight: 8,
              borderBottomWidth: selectedIndex === 5 ? 1 : 0,
              borderColor: 'black',
            }}>
            Cancelled
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(6);
            }}
            style={{
              marginRight: 8,
              borderBottomWidth: selectedIndex === 6 ? 1 : 0,
              borderColor: 'black',
            }}>
            Return Requested
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(7);
            }}
            style={{
              marginRight: 8,
              borderBottomWidth: selectedIndex === 7 ? 1 : 0,
              borderColor: 'black',
            }}>
            Return Initiated
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(8);
            }}
            style={{
              marginRight: 8,
              borderBottomWidth: selectedIndex === 8 ? 1 : 0,
              borderColor: 'black',
            }}>
            Return Completed
          </Text>
        </ScrollView>
      </View>
      <Swiper
        loop={false}
        showsPagination={false}
        ref={swiperRef}
        onIndexChanged={index => {
          console.log(index);
          setSelectedIndex(index);
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {brandOrders.map(order => {
            return (
              <OrderCard
                key={order.node.id}
                navigation={navigation}
                order={order.node}
              />
            );
          })}
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            zIndex: 2,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            zIndex: 2,
            marginTop: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            zIndex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
          <OrderCard navigation={navigation} />
        </ScrollView>
      </Swiper>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  ordersContainer: {
    flex: 1,
  },
  selected: {
    borderColor: 'black',
    borderBottomWidth: 1,
  },
});
