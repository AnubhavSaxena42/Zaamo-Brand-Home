//@ts-nocheck
import React, {useState, useRef, useEffect} from 'react';
import {
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Animated,
  RefreshControl,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';

import OrderCard from '../../components/OrderCard/OrderCard';
import OrdersOverviewCard from '../../components/OrdersOverviewCard/OrdersOverviewCard';
import {useQuery, NetworkStatus, useLazyQuery} from '@apollo/client';
import {
  GET_ORDERS,
  GET_STORE,
  GET_AUTHORISED_BRANDS,
  GET_BRAND_ORDERS,
} from '../../api/queries';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAuthorisedBrands,
  setShippingPolicy,
  setReturnPolicy,
  setBrandContactName,
  setBrandContactNumber,
  setBrandEmail,
  setBrandOrderInfo,
} from '../../redux/reducers/userReducer';
import {
  setStoreInfo,
  setStoreCollections,
  setStoreProducts,
  setWarehouse,
} from '../../redux/reducers/storeReducer';
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
var ScrollableTabView = require('react-native-scrollable-tab-view-forked');

const {width, height} = Dimensions.get('screen');
const OrdersScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const storeResponse = useQuery(GET_STORE, {
    variables: {
      collectionEndCursor: '',
    },
    notifyOnNetworkStatusChange: true,
  });

  /* useEffect(() => {
    if (brandOrdersResponse.data) {
      console.log('BrandOrders:::', brandOrdersResponse.data);
    }
  }, [brandOrdersResponse.data]);*/
  const mobileNumber = useSelector(state => state.user.mobileNumber);
  const brandResponse = useQuery(GET_AUTHORISED_BRANDS, {
    variables: {
      mobileNo: '91' + mobileNumber,
      endCursor: '',
    },
    notifyOnNetworkStatusChange: true,
  });
  useEffect(() => {
    if (brandResponse.data) {
      console.log('Look here:', brandResponse.data);
      if (
        brandResponse.data.userByMobile &&
        brandResponse.data.userByMobile.authorisedBrands[0] &&
        brandResponse.data.userByMobile.authorisedBrands[0].products
      ) {
        const newStoreProducts =
          brandResponse.data.userByMobile.authorisedBrands[0].products.edges.map(
            ({node}) => {
              return {
                brandName: node.brand.brandName,
                id: node.id,
                name: node.name,
                url: node.url,
                thumbnail: node.thumbnail
                  ? node.thumbnail.url
                  : 'https://media-exp1.licdn.com/dms/image/C4E0BAQGymyKm7OE3wg/company-logo_200_200/0/1636442519943?e=2159024400&v=beta&t=19hHu3puobGsregS0-31D-KiANWe3NqrKZESktzQC30',
                price: node.pricing.priceRange
                  ? node.pricing.priceRange.start.net.amount
                  : 0,
              };
            },
          );

        console.log(
          brandResponse.data.userByMobile.authorisedBrands[0]
            .brandContactNumber,
        );
        console.log(
          brandResponse.data.userByMobile.authorisedBrands[0].brandContactName,
        );
        const policies = JSON.parse(
          brandResponse.data.userByMobile.authorisedBrands[0]
            .shippingReturnPolicy,
        );

        const guidelines = (zaamoGuidelines = JSON.parse(
          brandResponse.data.userByMobile.authorisedBrands[0]
            .zaamoCreatorsGuidelines,
        ));
        dispatch(setShippingPolicy(policies.shipping_policy));
        dispatch(setReturnPolicy(policies.return_policy));
        console.log('WEEKND:::', brandResponse.data);
        dispatch(
          setBrandContactName(
            brandResponse.data.userByMobile.authorisedBrands[0].staffMembers
              .edges[0]?.node.firstName +
              brandResponse.data.userByMobile.authorisedBrands[0].staffMembers
                .edges[0]?.node.lastName,
          ),
        );
        dispatch(
          setBrandContactNumber(
            brandResponse.data.userByMobile.authorisedBrands[0].staffMembers
              .edges[0]?.node.mobileNo,
          ),
        );
        dispatch(
          setBrandEmail(
            brandResponse.data.userByMobile.authorisedBrands[0].staffMembers
              .edges[0]?.node.email,
          ),
        );
        dispatch(
          setBrandOrderInfo(
            brandResponse.data.userByMobile.authorisedBrands[0].brandOrderInfo,
          ),
        );
        dispatch(setStoreProducts(newStoreProducts));
        const warehouseId =
          brandResponse.data.userByMobile.authorisedBrands[0].warehouse;
        dispatch(setWarehouse(warehouseId));
        const authorisedBrands =
          brandResponse.data.userByMobile.authorisedBrands.map(brand => {
            return {
              name: brand.brandName,
              id: brand.id,
            };
          });
        dispatch(setAuthorisedBrands(authorisedBrands));
      }
    }
  }, [brandResponse.data]);

  useEffect(() => {
    if (storeResponse.data) {
      console.log('RESPONSE::::', storeResponse.data);
      dispatch(
        setStoreInfo({
          id: storeResponse.data.store.id,
          storeName: storeResponse.data.store.storeName,
          storeType: storeResponse.data.store.storeType,
          storeUrl: storeResponse.data.store.storeUrl,
        }),
      );
      const storeCollections = storeResponse.data.store.collections.edges.map(
        ({node}) => {
          return {
            id: node.id,
            products: node.products ? node.products.edges : [],
            imageUrl: node.imageUrl ? node.imageUrl : '',
            name: node.name ? node.name : '',
            slug: node?.slug,
          };
        },
      );
      dispatch(setStoreCollections(storeCollections));
    }
  }, [storeResponse.data]);

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

  const OrderCategoryTab = ({label, data2}) => {
    const [onEndReachedMomentum, setOnEndReachedMomentum] = useState(false);
    /*const {data, error, fetchMore, refetch, networkStatus, loading} = useQuery(
      GET_ORDERS,
      {
        notifyOnNetworkStatusChange: true,
        variables: {
          endCursor: '',
        },
      },
  );*/
    const brandID = useSelector(state => state.user?.authorisedBrands[0]?.id);
    const {data, error, loading, fetchMore, refetch, networkStatus} = useQuery(
      GET_BRAND_ORDERS,
      {
        variables: {
          endCursor: '',
          brands: [brandID],
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-and-network',
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
        console.log('BRAND ORDERS:::', data);
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
          {id: 'RECEIVED', name: 'Received', value: 0},
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
          if (status === 'Received') {
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
        console.log('ORDERS::', {
          allOrders,
          receivedOrders,
          shippedOrders,
          inProcessOrders,
          deliveredOrders,
          cancelledOrders,
          returnRequestedOrders,
          returnInitiatedOrders,
          returnCompletedOrders,
          fulfilledOrders,
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
    else if (label === 'Received')
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

    /*return (
      <View style={{flexGrow: 1}}>
        <Pressable
          onPress={() =>
            refetch({
              endCursor: '',
            })
          }
          style={{
            height: 30,
            alignSelf: 'center',
            width: 100,
            borderRadius: 10,
            marginVertical: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          }}>
          <Text style={{color: 'white', fontSize: 12}}>Refresh Orders</Text>
        </Pressable>
        <FlatList
          refreshing={refreshing}
          bounces={false}
          onRefresh={() => {
            refetch({
              endCursor: '',
            });
          }}
          data={category}
          showsVerticalScrollIndicator={true}
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
          renderItem={_renderSubItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: '15%',
            width: '100%',
            justifyContent: category.length === 0 ? 'center' : 'flex-start',
          }}
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
                        width: 60,
                        height: 55,
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
      </View>
    );*/
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
                      width: 60,
                      height: 55,
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
            data2={[1, 2, 3, 4]}
          />
          <OrderCategoryTab
            data2={[1, 2, 3, 4]}
            tabLabel={{label: 'Received '}}
            label="Received"
          />
          <OrderCategoryTab
            tabLabel={{label: 'In Process'}}
            label="In Process"
            data2={[1, 2, 3, 4]}
          />
          <OrderCategoryTab
            data2={[1, 2, 3, 4]}
            tabLabel={{label: 'Shipped'}}
            label="Shipped"
          />
          <OrderCategoryTab
            tabLabel={{label: 'Delivered'}}
            data2={[1, 2, 3, 4]}
            label="Delivered"
          />
          <OrderCategoryTab
            tabLabel={{label: 'Cancelled'}}
            label="Cancelled"
            data2={[1, 2, 3, 4]}
          />
          <OrderCategoryTab
            tabLabel={{label: 'Return Requested'}}
            label="Return Requested"
            data2={[1, 2, 3, 4]}
          />
          <OrderCategoryTab
            data2={[1, 2, 3, 4]}
            tabLabel={{label: 'Return Initiated'}}
            label="Return Initiated"
          />
          <OrderCategoryTab
            data2={[1, 2, 3, 4]}
            tabLabel={{label: 'Return Completed'}}
            label="Return Completed"
          />
          <OrderCategoryTab
            data2={[1, 2, 3, 4]}
            tabLabel={{label: 'Fulfilled'}}
            label="Fulfilled"
          />
        </ScrollableTabView>
      </SafeAreaView>
      {/*<View style={styles.ordersListContainer}>
        <View style={styles.tabsContainer}>
          <Tabs
            data={[
              {text: 'All Orders', ref: React.createRef()},
              {text: 'Received', ref: React.createRef()},
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
          //ref={ref}
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

        <SwiperFlatList
          ref={ref}
          index={0}
          data={listData}
          renderItem={_renderItem}
          onChangeIndex={({index}) => updateIndicator(index)}
        />
      </View>*/}
    </SafeAreaView>
  );
};

export default OrdersScreen;
