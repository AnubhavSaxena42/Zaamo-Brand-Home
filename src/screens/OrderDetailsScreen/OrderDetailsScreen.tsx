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
import {UPDATE_FULFILLMENT} from './mutations';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
import {GET_ORDERS} from '../OrdersScreen/queries';
const windowWidth = Dimensions.get('window').width;
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
    <ScrollView >
      <Text
        style={{
          zIndex: 2,
          color: 'white',
          fontSize: 22,
          textAlign: 'center',
          marginTop: '5%',
          fontFamily: 'Roboto-Bold',
        }}>
        Order Details
      </Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{zIndex: 2, position: 'absolute', left: 10, top: 20}}>
        <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
      </TouchableOpacity>
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
          marginTop: '4%',
        }}>
        <OrderCard
          order={order}
          status={route.params.status}
          navigation={navigation}
          isDetails={true}
        />
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
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
          <View style={{paddingTop: '3%'}}>
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
          <View style={{paddingTop: '3%', paddingHorizontal: '15%'}}>
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
          <Text style={{color: 'white', fontWeight: 'bold'}}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  orderDetailsContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
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
    color: 'black',
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
