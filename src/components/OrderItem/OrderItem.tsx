import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';
import toastService from '../../services/toast-service';
import Dropdown from '../Dropdown';

const OrderItem = ({line, id, status, setData, fulfillment}) => {
  const [fulfillmentStatus, setFulfillmentStatus] = useState(status);
  const [wasInitiallyCancelled, setWasInitiallyCancelled] = useState(false);
  useEffect(() => {
    if (status === 'CANCELED') setWasInitiallyCancelled(true);
  }, []);
  const fulfillmentDataItems = [
    {id: 'IN_PROCESS', name: 'In Process'},
    {id: 'SHIPPED', name: 'Shipped'},
    {id: 'DELIVERED', name: 'Delivered'},
    {id: 'CANCELED', name: 'Canceled'},
    {id: 'RETURN_REQUESTED', name: 'Return Requested'},
    {id: 'RETURN_INITIATED', name: 'Return Initiated'},
    {id: 'RETURN_COMPLETED', name: 'Return Completed'},
    {id: 'FULFILLED', name: 'Fulfilled'},
  ];
  const getFulfillmentStatusDisplay = () => {
    if (fulfillmentStatus === 'IN_PROCESS') return 'In Process';
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

  return (
    <View style={styles.orderItemContainer}>
      <Modal visible={isFulfillmentModalOpen} transparent={true}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}>
            <Text
              style={{
                marginVertical: '5%',
                textAlign: 'center',
                fontSize: 20,
                color: 'black',
              }}>
              Select FulFillment Status
            </Text>
            {/*<ScrollView contentContainerStyle={{flex: 1}}>
              {brandItems.map(brandItem => (
                <ModalItem
                  name={brandItem.name}
                  value={brandItem.id}
                  selectedItems={selectedBrands}
                  setSelectedItems={setSelectedBrands}
                />
              ))}
            </ScrollView>*/}
            <FlatList
              data={fulfillmentDataItems}
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
                const newData = fulfillment.map(item => {
                  if (item.id === id) {
                    return {
                      id: item.id,
                      status: fulfillmentStatus,
                    };
                  } else {
                    return item;
                  }
                });

                setData(newData);
                setIsFulfillmentModalOpen(false);
              }}
              style={{
                alignSelf: 'center',
                backgroundColor: 'black',
                width: '30%',
                marginVertical: '4%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: '2%',
              }}>
              <Text style={{color: 'white', fontSize: 16}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Image source={{uri: line.thumbnail.url}} style={styles.imageStyle} />
      <View style={styles.orderInfo}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '2%',
          }}>
          <Text style={{fontSize: 14, color: 'black', width: '80%'}}>
            {line.productName}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontWeight: 'bold',
              fontFamily: 'Roboto-Bold',
            }}>
            Rs {line.totalPrice.net.amount}
          </Text>
        </View>
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
        <View style={{position: 'absolute', bottom: '20%', marginLeft: '3%'}}>
          <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
            Order Status
          </Text>
          <View
            style={{
              width: 250,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.1)',
              borderRadius: 5,
              paddingHorizontal: '2%',
              paddingVertical: '2%',
            }}>
            <Text style={{textAlignVertical: 'center'}}>
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
              style={{
                height: '100%',
                width: 70,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text style={{color: 'white'}}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItemContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    marginVertical: '2%',
  },
  imageStyle: {
    height: 150,
    width: '30%',
    borderRadius: 10,
  },
  orderInfo: {
    flex: 1,
    paddingHorizontal: '2%',
    paddingVertical: '2%',
  },
});
