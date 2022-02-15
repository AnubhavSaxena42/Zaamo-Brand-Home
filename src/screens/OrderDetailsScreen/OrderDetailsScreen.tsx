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
import {GET_ORDERS} from '../../api/queries';
import {styles} from './styles';

const OrderDetailsScreen = ({navigation, route}) => {
  const order = route.params?.order ? route.params.order : {};
  const warehouseId = useSelector(state => state.store.warehouse);
  const [fulfillmentData, setFullfillmentData] = useState(
    order.fulfillments?.map(fulfillment => {
      return {
        id: fulfillment?.id,
        status: fulfillment?.status,
      };
    }),
  );
  const dispatch = useDispatch();
  const [updateFulfillment, updateFulfillmentResponse] = useMutation(
    UPDATE_FULFILLMENT,
    {
      variables: {
        id: fulfillmentData[0]?.id,
        fulfillmentStatus: fulfillmentData[0]?.status,
        warehouseId: warehouseId,
      },
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
      <ScrollView>
        <Text style={styles.headingText}>Order Details</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
        </TouchableOpacity>
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
            {order.fulfillments.map(fulfillment => {
              return (
                <OrderItem
                  key={fulfillment.id}
                  id={fulfillment.id}
                  setData={setFullfillmentData}
                  fulfillment={fulfillmentData}
                  status={fulfillment.status}
                  line={fulfillment.lines[0].orderLine}
                />
              );
            })}
          </View>
          <View style={styles.userDetailsSection}>
            <View style={styles.userDetailsSubSection}>
              <Text style={styles.headerText}>User Details</Text>
              <Text style={styles.detailText}>
                {' '}
                {order.user?.firstName} {order.user?.lastName}
              </Text>
              <Text style={styles.detailText}>
                {order ? order.lines?.length : '1'}{' '}
                {order?.lines?.length > 1 ? 'items' : 'item'}
              </Text>
            </View>
            <View style={styles.shippingDetailsSubSection}>
              <Text style={styles.headerText}>Shipping Details</Text>
              <Text style={styles.detailText}>
                {order.user
                  ? order.user.defaultBillingAddress?.streetAddress1
                  : ''}
                {order.user
                  ? order.user.defaultBillingAddress?.streetAddress2
                  : ''}
                {order.user ? order.user.defaultBillingAddress?.postalCode : ''}
              </Text>
              <Text style={styles.detailText}>{order.user?.mobileNo}</Text>
              <Text style={styles.detailText}>{order.user?.email}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              fulfillmentData.forEach(fulfillment => {
                updateFulfillment({
                  variables: {
                    id: fulfillment.id,
                    fulfillmentStatus: fulfillment.status,
                    warehouseId: warehouseId,
                  },
                  refetchQueries: [GET_ORDERS],
                });
              });
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
