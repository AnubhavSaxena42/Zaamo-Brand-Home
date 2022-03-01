import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import toastService from '../../services/toast-service';
import {styles} from './styles';
const OrderItem = ({line, id, status, setData, fulfillment}) => {
  const [fulfillmentStatus, setFulfillmentStatus] = useState(status);
  const [shippingId, setShippingId] = useState('');
  const [shippingProvider, setShippingProvider] = useState('');
  console.log('Fulfillment::', {line, id, status, setData, fulfillment});
  const [wasInitiallyCancelled, setWasInitiallyCancelled] = useState(false);
  useEffect(() => {
    if (status === 'CANCELED') setWasInitiallyCancelled(true);
    setShippingId(fulfillment?.shippingFulfillment?.shippingId);
    setShippingProvider(fulfillment?.shippingFulfillment?.shippingProvider);
  }, []);
  const getAvailableFulfillmentOptions = () => {
    let flag = false;
    let availableFulfillmentOptions = [];
    const fulfillmentDataItems = [
      {id: 'RECEIVED', name: 'Received'},
      {id: 'IN_PROCESS', name: 'In Process'},
      {id: 'SHIPPED', name: 'Shipped'},
      {id: 'DELIVERED', name: 'Delivered'},
      {id: 'CANCELED', name: 'Canceled'},
      {id: 'RETURN_REQUESTED', name: 'Return Requested'},
      {id: 'RETURN_INITIATED', name: 'Return Initiated'},
      {id: 'RETURN_COMPLETED', name: 'Return Completed'},
      {id: 'FULFILLED', name: 'Fulfilled'},
    ];
    for (let i = 0; i < fulfillmentDataItems.length; i++) {
      if (fulfillmentDataItems[i].id === status) flag = true;
      if (flag === true)
        availableFulfillmentOptions.push(fulfillmentDataItems[i]);
    }
    return availableFulfillmentOptions;
  };
  const setNewFulfillmentData = () => {
    const newData = fulfillment.map(item => {
      if (item.id === id) {
        if (fulfillmentStatus === 'SHIPPED') {
          return {
            id: item.id,
            status: fulfillmentStatus,
            shippingId: shippingId,
            shippingProvider: shippingProvider,
          };
        } else {
          return {
            id: item.id,
            status: fulfillmentStatus,
          };
        }
      } else {
        return item;
      }
    });

    setData(newData);
  };
  const getFulfillmentStatusDisplay = () => {
    if (fulfillmentStatus === 'RECEIVED') return 'Received';
    else if (fulfillmentStatus === 'IN_PROCESS') return 'In Process';
    else if (fulfillmentStatus === 'SHIPPED') return 'Shipped';
    else if (fulfillmentStatus === 'DELIVERED') return 'Delivered';
    else if (fulfillmentStatus === 'CANCELED') return 'Cancelled';
    else if (fulfillmentStatus === 'RETURN_REQUESTED')
      return 'Return Requested';
    else if (fulfillmentStatus === 'RETURN_INITIATED')
      return 'Return Initiated';
    else if (fulfillmentStatus === 'RETURN_COMPLETED')
      return 'Return Completed';
    else if (fulfillmentStatus === 'FULFILLED') return 'Fulfilled';
  };
  const [isFulfillmentModalOpen, setIsFulfillmentModalOpen] = useState(false);
  const ModalItem = ({
    colorItem,
    name,
    value,
    selectedItem,
    setSelectedItem,
  }) => {
    const onPressHandler = () => {
      if (selectedItem === value) {
        return;
      } else {
        setSelectedItem(value);
      }
    };
    const onSelectColor = () => {
      if (selectedItem.id === colorItem.id) {
        return;
      } else {
        setSelectedItem(colorItem);
      }
    };
    let backgroundColor, textBackgroundColor;
    if (colorItem) {
      if (colorItem.id === selectedItem.id) {
        backgroundColor = 'black';
        textBackgroundColor = 'white';
      } else {
        backgroundColor = 'white';
        textBackgroundColor = 'black';
      }
    } else {
      if (selectedItem === value) {
        backgroundColor = 'black';
        textBackgroundColor = 'white';
      } else {
        backgroundColor = 'white';
        textBackgroundColor = 'black';
      }
    }
    return (
      <TouchableOpacity
        onPress={colorItem ? onSelectColor : onPressHandler}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
          paddingVertical: '2%',
          width: '100%',
          borderBottomColor: 'rgba(0,0,0,0.2)',
          borderBottomWidth: 1,
          alignItems: 'center',
          backgroundColor: backgroundColor,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: textBackgroundColor,
          }}>
          {colorItem ? colorItem.name : name}
        </Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    setNewFulfillmentData();
  }, [shippingId, shippingProvider]);
  return (
    <View style={styles.orderItemContainer}>
      <Modal
        visible={isFulfillmentModalOpen}
        onRequestClose={() => setIsFulfillmentModalOpen(false)}
        transparent={true}>
        <SafeAreaView style={styles.fulfillmentModalContainer}>
          <View style={styles.fulfillmentModalSubContainer}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={{position: 'absolute', left: 10}}
                onPress={() => setIsFulfillmentModalOpen(false)}>
                <Ionicons name="arrow-back-sharp" color={'black'} size={25} />
              </TouchableOpacity>
              <Text style={styles.fulfillmentModalHeaderText}>
                Select FulFillment Status
              </Text>
            </View>
            <FlatList
              data={getAvailableFulfillmentOptions()}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <ModalItem
                  name={item.name}
                  value={item.id}
                  selectedItem={fulfillmentStatus}
                  setSelectedItem={setFulfillmentStatus}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => {
                setNewFulfillmentData();
                setIsFulfillmentModalOpen(false);
              }}
              style={styles.fulfillmentModalConfirmButton}>
              <Text style={styles.fulfillmentModalConfirmButtonText}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <Image source={{uri: line?.thumbnail.url}} style={styles.imageStyle} />
      <View style={styles.orderInfo}>
        <View style={styles.namePriceInfoContainer}>
          <Text style={styles.productNameText}>{line?.productName}</Text>
          <Text style={styles.productPriceText}>
            Rs {line?.totalPrice.net.amount}
          </Text>
        </View>
        {/* Variant Info ??? */}
        {/*<View style={{flexDirection: 'row', marginBottom: '2%'}}>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              backgroundColor: 'ghostwhite',
              paddingHorizontal: '3%',
              borderRadius: 5,
              marginRight: '3%',
            }}>
            Black
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              backgroundColor: 'ghostwhite',
              paddingHorizontal: '2%',
              borderRadius: 5,
            }}>
            L
          </Text>
        </View>*/}
        {fulfillmentStatus === 'SHIPPED' ? (
          <View style={styles.shippingInputContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.shippingInput}>Shipping ID:</Text>
              <TextInput
                value={shippingId}
                keyboardType="number-pad"
                onChangeText={text => {
                  setShippingId(text);
                }}
                style={styles.inputStyle}
                placeholder={''}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.shippingInput}>Shipping Provider:</Text>
              <TextInput
                value={shippingProvider}
                keyboardType="number-pad"
                onChangeText={text => setShippingProvider(text)}
                style={styles.inputStyle}
                placeholder={''}
              />
            </View>
          </View>
        ) : null}
        {id !== undefined && (
          <View style={styles.statusContainer}>
            <Text style={styles.statusHeaderText}>Order Status</Text>
            <View style={styles.statusChangerContainer}>
              <Text style={styles.statusText}>
                {fulfillmentStatus
                  ? getFulfillmentStatusDisplay()
                  : 'Update Fulfillment status'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (wasInitiallyCancelled)
                    toastService.showToast(
                      'Cancelled Order Status can not be updated!',
                      true,
                    );
                  else setIsFulfillmentModalOpen(true);
                }}
                style={styles.statusChangeButton}>
                <Text style={styles.statusChangeButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderItem;
