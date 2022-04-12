//@ts-nocheck
import React, {useState, useRef, useEffect} from 'react';
import {
  Image,
  Dimensions,
  Text,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrdersOverviewCard from '../../components/OrdersOverviewCard/OrdersOverviewCard';
import {useQuery, NetworkStatus, useLazyQuery} from '@apollo/client';
import {GET_BRAND_ORDERS} from '../../api/queries';
import {useSelector, useDispatch} from 'react-redux';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import {styles} from './styles';
import TabBar from 'react-native-underline-tabbar';
import tailwind from 'tailwind-rn';
import {
  setAllOrders,
  setReceivedOrders,
  setInProcessOrders,
  setDeliveredOrders,
  setCancelledOrders,
  setShippedOrders,
  setFulfilledOrders,
  setReturnCompletedOrders,
  setReturnInitiatedOrders,
  setReturnRequestedOrders,
} from '../../redux/reducers/ordersReducer';
import {BarIndicator} from 'react-native-indicators';
import ScrollableTabView from '../../components/react-native-scrollable-tab-view-forked';
//var ScrollableTabView = require('react-native-scrollable-tab-view-forked');
const {width, height} = Dimensions.get('screen');
const OrdersScreen = ({navigation}) => {
  const dispatch = useDispatch();
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

  const OrderCategoryTab = ({label}) => {
    const [onEndReachedMomentum, setOnEndReachedMomentum] = useState(false);
    const brandID = useSelector(state => state.user?.authorisedBrands[0]?.id);
    const {data, loading, fetchMore, refetch, networkStatus} = useQuery(
      GET_BRAND_ORDERS,
      {
        variables: {
          endCursor: '',
          brands: [brandID],
        },
        notifyOnNetworkStatusChange: true,
      },
    );

    const [ordersPageInfo, setOrdersPageInfo] = useState({
      hasNextPage: true,
      endCursor: '',
      startCursor: '',
    });

    const refreshing = networkStatus === NetworkStatus.refetch;
    useEffect(() => {
      if (data) {
        setOrdersPageInfo(data.masterDashboard.pageInfo);
        const orders = data.masterDashboard.edges.filter(
          ({node}) => node.lines.length !== 0,
        );
        let newOrders = orders.map(order => {
          return {
            ...order,
            status: '',
          };
        });

        let allOrders = [],
          receivedOrders = [],
          inProcessOrders = [],
          shippedOrders = [],
          deliveredOrders = [],
          cancelledOrders = [],
          returnRequestedOrders = [],
          returnInitiatedOrders = [],
          returnCompletedOrders = [],
          fulfilledOrders = [];
        const fulfillmentSortItems = [
          {id: 'PLACED', name: 'Placed', value: 0},
          {id: 'IN_PROCESS', name: 'In Process', value: 1},
          {id: 'SHIPPED', name: 'Shipped', value: 2},
          {id: 'DELIVERED', name: 'Delivered', value: 3},
          {id: 'CANCELED', name: 'Cancelled', value: 4},
          {id: 'RETURN_REQUESTED', name: 'Return Requested', value: 5},
          {id: 'RETURN_INITIATED', name: 'Return Initiated', value: 6},
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
          if (status === 'Placed') {
            order.status = status;
            receivedOrders.push(order);
            allOrders.push(order);
          } else if (status === 'In Process') {
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
          /*if (order.fulfillments && order.fulfillments.length !== 0) {
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
              console.log('Min Status Value:', minStatusValue);
              const fulfillmentOverallStatus = findStatusName(minStatusValue);
              sortByStatus(fulfillmentOverallStatus, value);
            }*/
          if (order.lines && order.lines.length !== 0) {
            let minStatusValue = findStatusValue(
              order.lines[0]?.fulfilment?.status,
            );
            for (let i = 0; i < order.lines.length; i++) {
              let currentStatusValue = findStatusValue(
                order.lines[i]?.fulfilment?.status,
              );
              if (minStatusValue > currentStatusValue)
                minStatusValue = currentStatusValue;
            }

            const fulfillmentOverallStatus = findStatusName(minStatusValue);
            sortByStatus(fulfillmentOverallStatus, value);
          }
        });
        dispatch(setAllOrders(allOrders));
        dispatch(setReceivedOrders(receivedOrders));
        dispatch(setShippedOrders(shippedOrders));
        dispatch(setInProcessOrders(inProcessOrders));
        dispatch(setDeliveredOrders(deliveredOrders));
        dispatch(setCancelledOrders(cancelledOrders));
        dispatch(setReturnRequestedOrders(returnRequestedOrders));
        dispatch(setReturnInitiatedOrders(returnInitiatedOrders));
        dispatch(setReturnCompletedOrders(returnCompletedOrders));
        dispatch(setFulfilledOrders(fulfilledOrders));
      }
    }, [data]);
    const handleOnEndReached = () => {
      console.log(ordersPageInfo.hasNextPage);
      if (ordersPageInfo.hasNextPage) {
        console.log(ordersPageInfo.endCursor);
        fetchMore({
          variables: {
            endCursor: ordersPageInfo.endCursor,
          },
        });
      }
    };
    let category;
    if (label === 'All Orders')
      category = useSelector(state => state.orders.allOrders);
    else if (label === 'Placed')
      category = useSelector(state => state.orders.receivedOrders);
    else if (label === 'In Process')
      category = useSelector(state => state.orders.inProcessOrders);
    else if (label === 'Shipped')
      category = useSelector(state => state.orders.shippedOrders);
    else if (label === 'Delivered')
      category = useSelector(state => state.orders.deliveredOrders);
    else if (label === 'Cancelled')
      category = useSelector(state => state.orders.cancelledOrders);
    else if (label === 'Return Requested')
      category = useSelector(state => state.orders.returnRequestedOrders);
    else if (label === 'Return Initiated')
      category = useSelector(state => state.orders.returnInitiatedOrders);
    else if (label === 'Return Completed')
      category = useSelector(state => state.orders.returnCompletedOrders);
    else category = useSelector(state => state.orders.fulfilledOrders);

    const onDoRefresh = () => {
      refetch({
        endCursor: '',
      });
    };

    return (
      <FlatList
        data={category}
        contentContainerStyle={{
          flexGrow: 1,
          width: '100%',
          paddingBottom: '80%',
          justifyContent: category.length === 0 ? 'center' : 'flex-start',
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          setOnEndReachedMomentum(true);
          handleOnEndReached;
        }}
        onMomentumScrollEnd={() => {
          if (true) {
            onEndReachedMomentum && handleOnEndReached();
            setOnEndReachedMomentum(false);
          }
        }}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onDoRefresh}
        renderItem={_renderSubItem}
        ListFooterComponent={
          !refreshing && loading
            ? () => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <BarIndicator size={30} count={5} color="black" />
                  </View>
                );
              }
            : null
        }
        ListEmptyComponent={
          !refreshing && !loading
            ? () => (
                <View
                  style={[
                    tailwind(
                      'bg-white mt-1 mx-10   rounded border border-gray-400 flex-row items-center justify-center',
                    ),
                    {},
                  ]}>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                    }}
                    source={require('../../assets/images/orderlist.png')}
                  />
                  <Text
                    style={tailwind(
                      'text-sm font-semibold text-center px-6 py-5 text-gray-600 ',
                    )}>
                    No Orders
                  </Text>
                </View>
              )
            : null
        }
      />
    );
  };
  return (
    <SafeAreaView style={styles.ordersContainer}>
      <Text style={styles.headingText}>Orders</Text>
      <Image
        source={require('../../assets/images/DashboardEllipse.png')}
        style={styles.backgroundImageStyle}
      />
      <View style={styles.ordersOverviewCardContainer}>
        <OrdersOverviewCard />
      </View>

      <SafeAreaView style={[styles.container, {flexGrow: 1}]}>
        <ScrollableTabView
          tabBarActiveTextColor="black"
          scrollWithoutAnimation
          renderTabBar={() => <TabBar underlineColor="black" />}>
          <OrderCategoryTab
            tabLabel={{label: 'All orders'}}
            label="All Orders"
          />
          <OrderCategoryTab tabLabel={{label: 'Placed'}} label="Placed" />
          <OrderCategoryTab
            tabLabel={{label: 'In Process'}}
            label="In Process"
          />
          <OrderCategoryTab tabLabel={{label: 'Shipped'}} label="Shipped" />
          <OrderCategoryTab tabLabel={{label: 'Delivered'}} label="Delivered" />
          <OrderCategoryTab tabLabel={{label: 'Cancelled'}} label="Cancelled" />
          <OrderCategoryTab
            tabLabel={{label: 'Return Requested'}}
            label="Return Requested"
          />
          <OrderCategoryTab
            tabLabel={{label: 'Return Initiated'}}
            label="Return Initiated"
          />
          <OrderCategoryTab
            tabLabel={{label: 'Return Completed'}}
            label="Return Completed"
          />
          <OrderCategoryTab tabLabel={{label: 'Fulfilled'}} label="Fulfilled" />
        </ScrollableTabView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default OrdersScreen;
