//@ts-nocheck
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
  View,
  SafeAreaView,
  Animated,
} from 'react-native';
import Swiper from 'react-native-swiper';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrdersOverviewCard from '../../components/OrdersOverviewCard/OrdersOverviewCard';
import {useQuery} from '@apollo/client';
import {GET_ORDERS} from './queries';
import {useSelector, useDispatch} from 'react-redux';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
const OrdersScreen = ({navigation}) => {
  const {width, height} = Dimensions.get('screen');
  const {data, error, loading} = useQuery(GET_ORDERS, {
    notifyOnNetworkStatusChange: true,
  });
  const [brandOrders, setBrandOrders] = useState([]);
  const [listData, setListData] = useState([]);
  const [brandShippedOrders, setBrandShippedOrders] = useState([]);
  const [brandInProcessOrders, setBrandInProcessOrders] = useState([]);
  const [brandDeliveredOrders, setBrandDeliveredOrders] = useState([]);
  const [brandCancelledOrders, setBrandCancelledOrders] = useState([]);
  const [brandReturnRequestedOrders, setBrandReturnRequestedOrders] = useState(
    [],
  );
  const dispatch = useDispatch();
  const [brandReturnInitiatedOrders, setBrandReturnInitiatedOrders] = useState(
    [],
  );
  const [brandReturnCompletedOrders, setBrandReturnCompletedOrders] = useState(
    [],
  );
  const [brandFulfilledOrders, setBrandFulfilledOrders] = useState([]);

  const _renderSubItem = ({item}) => {
    return (
      <OrderCard
        key={item.node.id}
        navigation={navigation}
        order={item.node}
        status={item?.status}
      />
    );
  };
   const _renderItem = ({item, index}) => {
    return (
      <View>
        <FlatList
          data={item}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{width, alignItems: 'center'}}
          keyExtractor={index => index.toString()}
          renderItem={_renderSubItem}
        />
      </View>
    );
  };

  const Tab = React.forwardRef(({item, onItemPress}, ref) => {
    return (
      <TouchableOpacity onPress={onItemPress}>
        <View ref={ref} style={{marginRight: 10, marginBottom: 5}}>
          <Text style={{color: 'black'}}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    );
  });
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const Indicator = ({measures, scrollX, scrollViewRef, data}) => {
    const indicatorRef = useRef();
    const inputRange = data.map((_, i) => i * width);
    const indicatorWidth = scrollX.interpolate({
      inputRange,
      outputRange: measures.map(measure => measure.width),
    });
    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: measures.map(measure => measure.x),
    });
    return (
      <Animated.View
        ref={indicatorRef}
        style={{
          position: 'absolute',
          transform: [
            {
              translateX,
            },
          ],
          bottom: 0,
          height: 2.5,
          width: indicatorWidth,
          backgroundColor: 'black',
        }}
      />
    );
  };

  const Tabs = ({data, onItemPress, scrollX}) => {
    const containerRef = useRef();
    const scrollViewRef = useRef();
    const [measures, setMeasures] = useState([]);

    React.useEffect(() => {
      dispatch(setLoaderStatus(true))
      console.log('Container Ref:', containerRef.current);
      let m = [];
      setTimeout(() => {
        data.forEach(item => {
          item?.ref?.current?.measureLayout(
            containerRef.current,
            (x, y, width, height) => {
              console.log(x, y, width, height);
              m.push({
                x,
                y,
                width,
                height,
              });
            },
            error => {
              console.log('Error:', error);
            },
          );
        });
        setTimeout(()=>{   
          setMeasures(m)
          dispatch(setLoaderStatus(false))
        },1000)
      }, 1000);
    }, []);
    useEffect(()=>{
      if(measures.length===0) dispatch(setLoaderStatus(true))
      else dispatch(setLoaderStatus(false))
    },[measures])
    console.log('New Measures',measures)
    return (
      <View style={{paddingHorizontal: 10}}>
        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          horizontal>
          <View ref={containerRef} style={{flexDirection: 'row'}}>
            {data.map((item, index) => {
              return (
                <Tab
                  key={item.text}
                  onItemPress={() => onItemPress(index)}
                  item={item}
                  ref={item.ref}
                />
              );
            })}
            {measures.length > 0 && (
              <Indicator
                data={data}
                scrollViewRef={scrollViewRef}
                measures={measures}
                scrollX={scrollX}
              />
            )}
           </View>
        </ScrollView>
      </View>
    );
  };
  const onItemPress = React.useCallback(itemIndex => {
    ref?.current.scrollToOffset({
      offset: itemIndex * width,
    });
  });
  const ref = React.useRef();
  useEffect(() => {
    if (data) {
      const orders = data.orders.edges.filter(
        ({node}) => node.lines.length !== 0,
      );
      let newOrders = orders.map(order => {
        return {
          ...order,
          status: '',
        };
      });
      let allOrders = [],
        inProcessOrders = [],
        shippedOrders = [],
        deliveredOrders = [],
        cancelledOrders = [],
        returnRequestedOrders = [],
        returnInitiatedOrders = [],
        returnCompletedOrders = [],
        fulfilledOrders = [];
      const fulfillmentSortItems = [
        {id: 'IN_PROCESS', name: 'In Process', value: 1},
        {id: 'SHIPPED', name: 'Shipped', value: 2},
        {id: 'DELIVERED', name: 'Delivered', value: 3},
        {id: 'CANCELED', name: 'Cancelled', value: 4},
        {id: 'RETURN_REQUESTED', name: 'Return Requested', value: 5},
        {id: 'RETURN_INITIATED', name: 'Return Initiated', Value: 6},
        {id: 'RETURN_COMPLETED', name: 'Return Completed', value: 7},
        {id: 'FULFILLED', name: 'Fulfilled', value: 8},
      ];
      const findStatusValue = id => {
        for (let i = 0; i < fulfillmentSortItems.length; i++) {
          if (id === fulfillmentSortItems[i].id) {
            return fulfillmentSortItems[i].value;
          }
        }
      };
      const findStatusName = value => {
        for (let i = 0; i < fulfillmentSortItems.length; i++) {
          if (value === fulfillmentSortItems[i].value) {
            return fulfillmentSortItems[i].name;
          }
        }
      };
      const sortByStatus = (status, order) => {
        if (status === 'In Process') {
          order.status = status;
          inProcessOrders.push(order);
          allOrders.push(order);
        } else if (status === 'Shipped') {
          order.status = status;
          shippedOrders.push(order);
          allOrders.push(order);
        } else if (status === 'Delivered') {
          order.status = status;
          deliveredOrders.push(order);
          allOrders.push(order);
        } else if (status === 'Cancelled') {
          order.status = status;
          cancelledOrders.push(order);
          allOrders.push(order);
        } else if (status === 'Return Requested') {
          order.status = status;
          returnRequestedOrders.push(order);
          allOrders.push(order);
        } else if (status === 'Return Initiated') {
          order.status = status;
          returnInitiatedOrders.push(order);
          allOrders.push(order);
        } else if (status === 'Return Completed') {
          order.status = status;
          returnCompletedOrders.push(order);
          allOrders.push(order);
        } else {
          order.status = status;
          allOrders.push(order);
          fulfilledOrders.push(order);
        }
      };
      newOrders.forEach(value => {
        let order = value.node;
        if (order.fulfillments && order.fulfillments.length !== 0) {
          console.log(order);
          console.log(order.fulfillments[0].status);
          let minStatusValue = findStatusValue(order.fulfillments[0].status);
          for (let i = 0; i < order.fulfillments.length; i++) {
            let currentStatusValue = findStatusValue(
              order.fulfillments[i].status,
            );
            if (minStatusValue > currentStatusValue)
              minStatusValue = currentStatusValue;
          }

          const fulfillmentOverallStatus = findStatusName(minStatusValue);

          sortByStatus(fulfillmentOverallStatus, value);
        }
      });
      setBrandOrders(allOrders);
      setBrandInProcessOrders(inProcessOrders);
      setBrandShippedOrders(shippedOrders);
      setBrandDeliveredOrders(deliveredOrders);
      setBrandCancelledOrders(cancelledOrders);
      setBrandReturnRequestedOrders(returnRequestedOrders);
      setBrandReturnInitiatedOrders(returnInitiatedOrders);
      setBrandReturnCompletedOrders(returnCompletedOrders);
      setBrandFulfilledOrders(fulfilledOrders);
      setListData([
        allOrders,
        shippedOrders,
        inProcessOrders,
        deliveredOrders,
        cancelledOrders,
        returnRequestedOrders,
        returnInitiatedOrders,
        returnCompletedOrders,
        fulfilledOrders,
      ]);
    }
  }, [data]);
  console.log('Brand Orders:', brandOrders);
  console.log('In process Orders:', brandInProcessOrders);
  console.log('Shipped Orders', brandShippedOrders);
  console.log('Delivered Orders', brandDeliveredOrders);
  console.log('Cancelled Orders', brandCancelledOrders);
  console.log('Return Requested Orders', brandReturnRequestedOrders);
  console.log('Return Initiated Orders', brandReturnInitiatedOrders);
  console.log('Return Completed Orders', brandReturnCompletedOrders);
  console.log('Fulfilled Orders', brandFulfilledOrders);
  console.log('Cancelled orders:', brandCancelledOrders);

  useEffect(() => {
    if (loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [loading]);
  return (
    <SafeAreaView style={styles.ordersContainer}>
      <Text
        style={{
          zIndex: 2,
          color: 'white',
          fontSize: 22,
          textAlign: 'center',
          marginTop: '3%',
          fontFamily: 'Roboto-Bold',
        }}>
        Orders
      </Text>
      <Image
        source={require('../../assets/images/DashboardEllipse.png')}
        style={{
          height: 400,
          width: width,
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
          marginTop: '5%',
          marginBottom: '2%',
        }}>
        <OrdersOverviewCard />
        {/*<ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: '4%',
            paddingHorizontal: '2%',
          }}>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(0);
            }}
            style={{
              marginRight: 8,
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowRadius: 2,
              textShadowOffset: {width: 1, height: 1},
              borderBottomWidth: selectedIndex === 0 ? 2 : 0,
              paddingBottom: 10,
              paddingBottom: 5,
              borderColor: 'black',
              paddingBottom: 5,
              color: 'black',
            }}>
            All Orders
          </Text>

          <Text
            onPress={() => {
              swiperRef.current.scrollTo(1);
            }}
            style={{
              marginRight: 8,
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowRadius: 2,
              textShadowOffset: {width: 1, height: 1},
              borderBottomWidth: selectedIndex === 1 ? 2 : 0,
              paddingBottom: 10,
              paddingBottom: 5,
              borderColor: 'black',
              color: 'black',
            }}>
            Shipped
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(2);
            }}
            style={{
              marginRight: 8,
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowRadius: 2,
              textShadowOffset: {width: 1, height: 1},
              borderBottomWidth: selectedIndex === 2 ? 2 : 0,
              paddingBottom: 10,
              paddingBottom: 5,
              borderColor: 'black',
              color: 'black',
            }}>
            In Process
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(3);
            }}
            style={{
              marginRight: 8,
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowRadius: 2,
              textShadowOffset: {width: 1, height: 1},
              borderBottomWidth: selectedIndex === 3 ? 2 : 0,
              paddingBottom: 10,
              paddingBottom: 5,
              borderColor: 'black',
              color: 'black',
            }}>
            Delivered
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(4);
            }}
            style={{
              marginRight: 8,
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowRadius: 2,
              textShadowOffset: {width: 1, height: 1},
              borderBottomWidth: selectedIndex === 4 ? 2 : 0,
              paddingBottom: 10,
              paddingBottom: 5,
              borderColor: 'black',
              color: 'black',
            }}>
            Cancelled
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(5);
            }}
            style={{
              marginRight: 8,
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowRadius: 2,
              textShadowOffset: {width: 1, height: 1},
              borderBottomWidth: selectedIndex === 5 ? 2 : 0,
              paddingBottom: 10,
              paddingBottom: 5,
              borderColor: 'black',
              color: 'black',
            }}>
            Return Requested
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(6);
            }}
            style={{
              marginRight: 8,
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowRadius: 2,
              textShadowOffset: {width: 1, height: 1},
              borderBottomWidth: selectedIndex === 6 ? 2 : 0,
              paddingBottom: 10,
              paddingBottom: 5,
              borderColor: 'black',
              color: 'black',
            }}>
            Return Initiated
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(7);
            }}
            style={{
              marginRight: 8,
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowRadius: 2,
              textShadowOffset: {width: 1, height: 1},
              borderBottomWidth: selectedIndex === 7 ? 2 : 0,
              paddingBottom: 10,
              paddingBottom: 5,
              borderColor: 'black',
              color: 'black',
            }}>
            Return Completed
          </Text>
          <Text
            onPress={() => {
              swiperRef.current.scrollTo(8);
            }}
            style={{
              marginRight: 8,
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowRadius: 2,
              textShadowOffset: {width: 1, height: 1},
              borderBottomWidth: selectedIndex === 8 ? 2 : 0,
              paddingBottom: 10,
              paddingBottom: 5,
              borderColor: 'black',
              color: 'black',
            }}>
            Fulfilled
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
        <View>
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
                  status={order?.status}
                />
              );
            })}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              zIndex: 2,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {brandShippedOrders.map(order => {
              return (
                <OrderCard
                  key={order.node.id}
                  navigation={navigation}
                  order={order.node}
                  status={order?.status}
                />
              );
            })}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              zIndex: 2,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {brandInProcessOrders.map(order => {
              return (
                <OrderCard
                  key={order.node.id}
                  navigation={navigation}
                  order={order.node}
                  status={order?.status}
                />
              );
            })}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {brandDeliveredOrders.map(order => {
              return (
                <OrderCard
                  key={order.node.id}
                  navigation={navigation}
                  order={order.node}
                  status={order?.status}
                />
              );
            })}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {brandCancelledOrders.map(order => {
              return (
                <OrderCard
                  key={order.node.id}
                  navigation={navigation}
                  order={order.node}
                  status={order?.status}
                />
              );
            })}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {brandReturnRequestedOrders.map(order => {
              return (
                <OrderCard
                  key={order.node.id}
                  navigation={navigation}
                  order={order.node}
                  status={order?.status}
                />
              );
            })}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {brandReturnInitiatedOrders.map(order => {
              return (
                <OrderCard
                  key={order.node.id}
                  navigation={navigation}
                  order={order.node}
                  status={order?.status}
                />
              );
            })}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {brandReturnCompletedOrders.map(order => {
              return (
                <OrderCard
                  key={order.node.id}
                  navigation={navigation}
                  order={order.node}
                  status={order?.status}
                />
              );
            })}
          </ScrollView>
        </View>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {brandFulfilledOrders.map(order => {
              return (
                <OrderCard
                  key={order.node.id}
                  navigation={navigation}
                  order={order.node}
                  status={order?.status}
                />
              );
            })}
          </ScrollView>
        </View>
      </Swiper>*/}
      </View>
      <View style={{flex: 1,marginTop:5, backgroundColor: 'white'}}>
        <View style={{paddingBottom: 10}}>
          <Tabs
            onItemPress={onItemPress}
            scrollX={scrollX}
            data={[
              {text: 'All Orders', ref: React.createRef()},
              {text: 'Shipped', ref: React.createRef()},
              {text: 'In Process', ref: React.createRef()},
              {text: 'Delivered', ref: React.createRef()},
              {text: 'Cancelled', ref: React.createRef()},
              {text: 'Return Requested', ref: React.createRef()},
              {text: 'Return Initiated', ref: React.createRef()},
              {text: 'Return Completed', ref: React.createRef()},
              {text: 'Fulfilled', ref: React.createRef()},
            ]}
          />
        </View>
        <Animated.FlatList
          ref={ref}
          data={listData}
          contentContainerStyle={{backgroundColor: 'white'}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={index => index.toString()}
          renderItem={_renderItem}
          pagingEnabled
          disableIntervalMomentum
        />
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  ordersContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
