import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  SafeAreaView,
  View,
  ScrollView,
} from 'react-native';
import OrderCard from '../../components/OrderCard/OrderCard';
import OrderItem from '../../components/OrderItem/OrderItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation} from '@apollo/client';
import {UPDATE_FULFILLMENT} from '../../api/mutations';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
import {GET_BRAND_ORDERS, GET_KEY_METRICS} from '../../api/queries';
import {styles} from './styles';

const OrderDetailsScreen = ({navigation, route}) => {
  const order = route.params?.order ? route.params.order : {};
  console.log('ORDER:::', order);
  const warehouseId = useSelector(state => state.store.warehouse);
  console.log('Details:', {fulfillments: order.fulfillments});
  const [fulfillmentData, setFullfillmentData] = useState(
    order.lines.map(line => {
      if (line?.fulfilment?.shippingFulfillment) {
        return {
          id: line?.fulfilment?.id,
          status: line?.fulfilment?.status,
          shippingId: line?.fulfilment?.shippingFulfillment?.shippingId,
          shippingProvider:
            line?.fulfilment?.shippingFulfillment?.shippingProvider,
        };
      }
      return {
        id: line?.fulfilment?.id,
        status: line?.fulfilment?.status,
      };
    }),
  );

  console.log('Fulfillment Data::', fulfillmentData);
  const dispatch = useDispatch();
  const [updateFulfillment, updateFulfillmentResponse] = useMutation(
    UPDATE_FULFILLMENT,
    {
      variables: {
        id: fulfillmentData[0]?.id,
        fulfillmentStatus: fulfillmentData[0]?.status,
        warehouseId: warehouseId,
        shippingId: null,
        shippingProvider: null,
      },
      refetchQueries: [GET_BRAND_ORDERS, GET_KEY_METRICS],
    },
  );
  console.log('lookey', fulfillmentData);
  useEffect(() => {
    if (updateFulfillmentResponse.data) {
      if (updateFulfillmentResponse.data.updateFulfillment) {
        dispatch(setLoaderStatus(true));
        toastService.showToast('Updated Fulfillment', true);
        setTimeout(() => {
          navigation.goBack();
          dispatch(setLoaderStatus(false));
        }, 2000);
      }
    }
  }, [updateFulfillmentResponse.data]);
  useEffect(() => {
    if (updateFulfillmentResponse.loading) dispatch(setLoaderStatus(true));
    else {
      if (!updateFulfillmentResponse.data) dispatch(setLoaderStatus(false));
    }
  }, [updateFulfillmentResponse.loading]);

  return (
    <SafeAreaView style={styles.orderDetailsContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: '5%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
          </TouchableOpacity>
          <Text style={styles.headingText}>Order Details</Text>
        </View>
        <Image
          source={require('../../assets/images/DashboardEllipse.png')}
          style={styles.backgroundImageStyle}
        />
        <View style={styles.orderCardContainer}>
          <OrderCard
            order={order}
            status={route.params.status}
            navigation={navigation}
            isDetails={true}
          />
        </View>
        <View style={styles.orderItemsListContainer}>
          <View style={styles.orderDetailsSection}>
            <Text style={styles.headerText}>Order Details</Text>
            {/*order.fulfillments.map(fulfillment => {
              if (fulfillment.lines.length !== 0)
                return (
                  <OrderItem
                    key={fulfillment.id}
                    id={fulfillment.id}
                    setData={setFullfillmentData}
                    fulfillment={fulfillmentData}
                    status={fulfillment.status}
                    line={fulfillment?.lines[0]?.orderLine}
                  />
                );
            })*/}
            {order.lines.map(line => {
              return (
                <OrderItem
                  key={line?.id}
                  id={line?.fulfilment?.id}
                  setData={setFullfillmentData}
                  fulfillment={fulfillmentData}
                  status={line?.fulfilment?.status}
                  line={line}
                />
              );
            })}
          </View>
          <View style={styles.userDetailsSection}>
            <View style={styles.userDetailsSubSection}>
              <Text style={styles.headerText}>User Details</Text>
              <Text style={styles.detailText}>
                {order.shippingAddress?.firstName}{' '}
                {order.shippingAddress?.lastName}
              </Text>
              <Text style={styles.detailText}>
                {order ? order.lines?.length : '1'}{' '}
                {order?.lines?.length > 1 ? 'items' : 'item'}
              </Text>
            </View>
            <View style={styles.shippingDetailsSubSection}>
              <Text style={styles.headerText}>Shipping Details</Text>
              <Text style={styles.detailText}>
                {order.shippingAddress
                  ? order.shippingAddress?.streetAddress1
                  : ''}
                {order.shippingAddress
                  ? order.shippingAddress?.streetAddress2
                  : ''}
              </Text>
              <Text style={styles.detailText}>
                {order.shippingAddress?.city},
                {order.shippingAddress?.countryArea},
                {order.shippingAddress ? order.shippingAddress?.postalCode : ''}
              </Text>
              <Text style={styles.detailText}>
                {order.shippingAddress?.phone}
              </Text>
              <Text style={styles.detailText}>
                {order.shippingAddress?.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              toastService.showToast('Disabled', true);
              /* let flag = false;
              fulfillmentData.forEach(fulfillment => {
                if (fulfillment.status === 'SHIPPED') {
                  if (
                    !fulfillment.shippingId ||
                    fulfillment.shippingId === '' ||
                    !fulfillment.shippingProvider ||
                    fulfillment.shippingProvider === ''
                  ) {
                    toastService.showToast(
                      'Please fill out the shipping Details ',
                      true,
                    );
                    flag = true;
                  }
                }
              });
              if (flag) return;
              fulfillmentData.forEach(fulfillment => {
                if (fulfillment.status === 'SHIPPED') {
                  console.log('Running Shipped Fulfillment For::', fulfillment);
                  updateFulfillment({
                    variables: {
                      id: fulfillment.id,
                      fulfillmentStatus: fulfillment.status,
                      warehouseId: warehouseId,
                      shippingId: fulfillment.shippingId,
                      shippingProvider: fulfillment.shippingProvider,
                    },
                    refetchQueries: [GET_BRAND_ORDERS, GET_KEY_METRICS],
                  });
                } else {
                  console.log(
                    'Running other case fulfillment for::',
                    fulfillment,
                  );
                  updateFulfillment({
                    variables: {
                      id: fulfillment.id,
                      fulfillmentStatus: fulfillment.status,
                      warehouseId: warehouseId,
                      shippingId: null,
                      shippingProvider: null,
                    },
                    refetchQueries: [GET_KEY_METRICS, GET_BRAND_ORDERS],
                  });
                }
              });*/
            }}
            style={styles.button}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;
