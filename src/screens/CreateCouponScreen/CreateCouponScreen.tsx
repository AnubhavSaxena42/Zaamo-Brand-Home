import {useMutation, useQuery} from '@apollo/client';
import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
  View,
} from 'react-native';
import Checkbox from '../../components/Checkbox';
import Entypo from 'react-native-vector-icons/Entypo';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Header';
import {CREATE_COUPON, CREATE_VOUCHER} from './mutations';
import {GET_STORES, GET_BRANDS} from './queries';
import {FlatList} from 'react-native-gesture-handler';
const webDropdownStyle = {
  height: '30%',
  width: '15%',
  marginLeft: '2%',
  borderRadius: 5,
  alignItems: 'center',
  borderColor: 'rgba(0,0,0,0.2)',
  paddingHorizontal: 5,
  borderWidth: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 1,
  paddingVertical: 15,
  shadowOpacity: 1.0,
  elevation: 2,
  zIndex: 200,
};

const mobileDropdownStyle = {
  height: '3%',
  width: '100%',
  borderRadius: 5,
  alignItems: 'center',
  borderColor: 'rgba(0,0,0,0.2)',
  paddingHorizontal: 5,
  borderWidth: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 2,
  shadowOpacity: 1.0,
  elevation: 5,
  zIndex: 200,
};
const mobileDropdownValuesContainerStyle = {
  top: 40,
  width: '102%',
  alignSelf: 'center',
  borderWidth: 1,
  borderColor: 'rgba(0,0,0,0.2)',
};
const webDropdownValuesContainerStyle = {
  top: 18,
  width: '100%',
  borderWidth: 1,
  borderColor: 'rgba(0,0,0,0.2)',
};
const mobileDropdownValuesTextStyle = {
  fontSize: 14,
  fontFamily: 'Roboto-Regular',
  marginVertical: 2,
  marginLeft: 10,
};
const webDropdownValuesTextStyle = {
  fontSize: 16,
  fontFamily: 'Roboto-Regular',
  marginVertical: 5,
  marginLeft: 10,
};
const mobileDropdownTextStyle = {
  fontSize: 14,
  fontFamily: 'Open-Sans',
  fontWeight: '300',
  color: 'rgba(0, 0, 0, 0.75)',
};
const webDropdownTextStyle = {
  fontSize: 16,
  fontFamily: 'Open-Sans',
  fontWeight: '300',
  color: 'rgba(0, 0, 0, 0.75)',
};

const CreateCouponScreen = ({navigation}) => {
  const [isBrandsModalVisible, setIsBrandsModalVisible] = useState(false);
  const [discountType, setDiscountType] = useState('');
  const [owner, setOwner] = useState('');
  const [allBrandsItems, setAllBrandsItems] = useState([]);
  const [fieldError, setFieldError] = useState(false);
  const [ownerItems, setOwnerItems] = useState([
    {id: 'ZAAMO', name: 'Zaamo'},
    {id: 'BRAND', name: 'Brand'},
  ]);
  const [discountTypeItems, setDiscountTypeItems] = useState([
    {id: 'PERCENTAGE', name: 'Percentage'},
    {id: 'FIXED', name: 'Fixed'},
  ]);
  const [couponType, setCouponType] = useState('');
  const [selectedStores, setSelectedStores] = useState([]);
  const [isStoresModalVisible, setIsStoresModalVisible] = useState(false);
  const [couponTypeItems, setCouponTypeItems] = useState([
    {id: 'SHIPPING', name: 'Shipping'},
    {id: 'ENTIRE_ORDER', name: 'Entire Order'},
    {id: 'SPECIFIC_PRODUCT', name: 'Specific Product'},
  ]);
  const [upperLimit, setUpperLimit] = useState();
  const [minValue, setMinValue] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [influencerStore, setInfluencerStore] = useState('');
  const [influencerStoreItems, setInfluencerStoreItems] = useState([
    {id: 'U3RvcmU6NzE=', name: 'My Store'},
    {id: 'Influencer2', name: 'Influencer_2'},
  ]);
  const [brandItems, setBrandItems] = useState([
    {id: 'QnJhbmQ6MjE=', name: 'My Brand'},
  ]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponTitle, setCouponTitle] = useState('');
  const [couponName, setCouponName] = useState('');
  const [couponDescription, setCouponDescription] = useState('');
  const [discountValue, setDiscountValue] = useState();
  const storesResponse = useQuery(GET_STORES);
  const brandsResponse = useQuery(GET_BRANDS);
  let input = {
    type: couponType,
    name: couponName,
    code: couponCode,
    discountValueType: discountType,
    discountValue: discountValue,
    owner: owner,
    metadata: [
      {
        key: 'description',
        value: couponDescription,
      },
    ],
  };
  console.log('Input:', input);
  useEffect(() => {
    if (brandsResponse.data) {
      const newBrandItems = brandsResponse.data.brands.edges.map(({node}) => {
        return {
          id: node.id,
          name: node.brandName,
        };
      });
      setAllBrandsItems(newBrandItems);
    }
  }, [brandsResponse.data]);
  useEffect(() => {
    if (storesResponse.data) {
      const newStoreItems = storesResponse.data.stores.edges.map(({node}) => {
        return {
          id: node.id,
          name: node.storeName,
        };
      });
      console.log(newStoreItems);
      setInfluencerStoreItems(newStoreItems);
    }
  }, [storesResponse.data]);
  const onCreatePress = () => {
    if (!couponType || couponType === '') {
      setFieldError(true);
      return;
    }
    if (!couponCode || couponCode === '') {
      setFieldError(true);
      return;
    }
    if (!selectedStores || selectedStores.length === 0) {
      setFieldError(true);
      return;
    }
    if (!discountType || discountType === '') {
      setFieldError(true);
      return;
    }
    if (!discountValue || discountValue === '') {
      setFieldError(true);
      return;
    }
    if (
      couponType === 'SPECIFIC_PRODUCT' &&
      (!selectedBrands || selectedBrands.length === 0)
    ) {
      setFieldError(true);
      return;
    }
    if (!owner || owner === '') {
      setFieldError(true);
      return;
    }
    if (!couponDescription || couponDescription === '') {
      setFieldError(true);
      return;
    }
    if (minValue !== '') input.minAmountSpent = parseInt(minValue);
    if (minQuantity !== '')
      input.minCheckoutItemsQuantity = parseInt(minQuantity);
    if (upperLimit !== '') input.maxDiscountValue = parseInt(upperLimit);
    if (couponType === 'SPECIFIC_PRODUCT' || couponType === 'SHIPPING') {
      input.brands = selectedBrands;
    }
    console.log('New Input:', input);
    voucherBulkCreate();
  };
  const [voucherBulkCreate, voucherResponse] = useMutation(CREATE_VOUCHER, {
    variables: {
      input: input,
      stores: selectedStores,
    },
  });
  useEffect(() => {
    if (voucherResponse.data) {
      console.log('in use effect:', voucherResponse.data);
      if (voucherResponse.data.voucherBulkCreate.success) {
        navigation.navigate('MarketingScreen');
      }
    }
  }, [voucherResponse.data]);
  useEffect(() => {
    if (owner && owner === 'ZAAMO') {
      setBrandItems(allBrandsItems);
    } else {
      setBrandItems([{id: 'QnJhbmQ6MjE=', name: 'My Brand'}]);
    }
  }, [owner]);
  console.log(selectedStores);
  console.log(selectedBrands);
  const ModalItem = ({name, value, selectedItems, setSelectedItems}) => {
    const onPressHandler = () => {
      if (selectedItems.includes(value)) {
        const newSelectedItems = selectedItems.filter(item => item !== value);
        setSelectedItems(newSelectedItems);
      } else {
        const addSelectedItems = [...selectedItems, value];
        setSelectedItems(addSelectedItems);
      }
    };
    return (
      <TouchableOpacity
        onPress={onPressHandler}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
          width: '100%',
          borderBottomColor: 'rgba(0,0,0,0.2)',
          borderBottomWidth: 1,
          alignItems: 'center',
          backgroundColor: selectedItems.includes(value) ? 'black' : 'white',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: selectedItems.includes(value) ? 'white' : 'black',
          }}>
          {name}
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: selectedItems.includes(value)
              ? 'white'
              : 'rgba(0,0,0,0.4)',
            width: 26,
            height: 26,
            borderRadius: 13,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {selectedItems.includes(value) ? (
            <Entypo name="minus" size={15} color="white" />
          ) : (
            <Entypo name="plus" size={15} color="black" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: '35%'}}
      style={styles.createCouponContainer}>
      <Header tag={'Marketing'} fontSize={22} />
      {isBrandsModalVisible && (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            zIndex: 900,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
      )}
      <Modal visible={isBrandsModalVisible} transparent={true}>
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
              Select Brands
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
              data={brandItems}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <ModalItem
                  name={item.name}
                  value={item.id}
                  selectedItems={selectedBrands}
                  setSelectedItems={setSelectedBrands}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setIsBrandsModalVisible(false)}
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
      <Modal visible={isStoresModalVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginVertical: '5%',
              textAlign: 'center',
              fontSize: 20,
              color: 'black',
            }}>
            Select Influencer Stores
          </Text>

          {/*influencerStoreItems.map(storeItem => (
                <ModalItem
                  name={storeItem.name}
                  value={storeItem.id}
                  selectedItems={selectedStores}
                  setSelectedItems={setSelectedStores}
                />
              ))*/}

          {
            <View style={{flex: 1}}>
              <FlatList
                data={influencerStoreItems}
                renderItem={({item}) => (
                  <ModalItem
                    name={item.name}
                    value={item.id}
                    selectedItems={selectedStores}
                    setSelectedItems={setSelectedStores}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          }

          <TouchableOpacity
            onPress={() => setIsStoresModalVisible(false)}
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
      </Modal>
      <View style={{flex: 1, paddingHorizontal: '5%', paddingVertical: '4%'}}>
        <Text style={{fontSize: 28, color: 'black'}}>Create Coupon</Text>
        <Text style={{fontSize: 22, color: 'black', marginTop: '4%'}}>
          Coupon Details
        </Text>
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Select Coupon Type*
        </Text>
        <Dropdown
          tag="Select Coupon Type"
          items={couponTypeItems}
          selectedValue={couponType}
          iconColor="black"
          down
          setSelectedValue={setCouponType}
          dropDownContainerStyle={{...mobileDropdownStyle, zIndex: 600}}
          dropDownValuesTextStyle={
            Platform.OS === 'web'
              ? webDropdownValuesTextStyle
              : mobileDropdownValuesTextStyle
          }
          dropDownTextStyle={
            Platform.OS === 'web'
              ? webDropdownTextStyle
              : mobileDropdownTextStyle
          }
          dropDownValuesContainerStyle={
            Platform.OS === 'web'
              ? webDropdownValuesContainerStyle
              : mobileDropdownValuesContainerStyle
          }
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Select Discount Type*
        </Text>
        <Dropdown
          tag="Select Discount Type"
          items={discountTypeItems}
          selectedValue={discountType}
          iconColor="black"
          down
          setSelectedValue={setDiscountType}
          dropDownContainerStyle={
            Platform.OS === 'web' ? webDropdownStyle : mobileDropdownStyle
          }
          dropDownValuesTextStyle={
            Platform.OS === 'web'
              ? webDropdownValuesTextStyle
              : mobileDropdownValuesTextStyle
          }
          dropDownTextStyle={
            Platform.OS === 'web'
              ? webDropdownTextStyle
              : mobileDropdownTextStyle
          }
          dropDownValuesContainerStyle={
            Platform.OS === 'web'
              ? webDropdownValuesContainerStyle
              : mobileDropdownValuesContainerStyle
          }
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Discount Value*
        </Text>
        <TextInput
          value={discountValue}
          onChangeText={text => {
            setDiscountValue(parseInt(text));
          }}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Select Discount Value'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Upper Limit
        </Text>
        <TextInput
          value={upperLimit}
          onChangeText={text => {
            setUpperLimit(parseInt(text));
          }}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Select Upper Limit'}
        />
        <Text
          style={{
            marginTop: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Minimum Order
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%'}}>
            <Text
              style={{
                marginVertical: '5%',
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
              }}>
              Value
            </Text>
            <TextInput
              value={minValue}
              onChangeText={text => setMinValue(parseInt(text))}
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.3)',
                borderRadius: 4,
                backgroundColor: 'white',
                paddingHorizontal: '5%',
              }}
              placeholder={'Rs.599'}
            />
          </View>
          <View style={{width: '45%'}}>
            <Text
              style={{
                marginVertical: '5%',
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
              }}>
              Quantity
            </Text>
            <TextInput
              value={minQuantity}
              onChangeText={text => setMinQuantity(parseInt(text))}
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.3)',
                borderRadius: 4,
                backgroundColor: 'white',
                paddingHorizontal: '5%',
              }}
              placeholder={'4'}
            />
          </View>
        </View>
        {couponType === 'SPECIFIC_PRODUCT' && (
          <TouchableOpacity
            onPress={() => setIsBrandsModalVisible(true)}
            style={{
              marginTop: '5%',
              width: '100%',
              height: '3%',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowRadius: 2,
              shadowOpacity: 1.0,
              elevation: 5,
            }}>
            <Text>Select Brands*</Text>
          </TouchableOpacity>
        )}
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Select Owner*
        </Text>
        <Dropdown
          tag="Select Owner"
          items={ownerItems}
          selectedValue={owner}
          iconColor="black"
          down
          setSelectedValue={setOwner}
          dropDownContainerStyle={
            Platform.OS === 'web' ? webDropdownStyle : mobileDropdownStyle
          }
          dropDownValuesTextStyle={
            Platform.OS === 'web'
              ? webDropdownValuesTextStyle
              : mobileDropdownValuesTextStyle
          }
          dropDownTextStyle={
            Platform.OS === 'web'
              ? webDropdownTextStyle
              : mobileDropdownTextStyle
          }
          dropDownValuesContainerStyle={
            Platform.OS === 'web'
              ? webDropdownValuesContainerStyle
              : mobileDropdownValuesContainerStyle
          }
        />
        <Text
          style={{
            marginTop: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Date
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%'}}>
            <Text
              style={{
                marginVertical: '5%',
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
              }}>
              Start Date
            </Text>
            <TextInput
              value={startDate}
              onChangeText={text => setStartDate(text)}
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.3)',
                borderRadius: 4,
                backgroundColor: 'white',
                paddingHorizontal: '5%',
              }}
              placeholder={'dd/mm/yy'}
            />
          </View>
          <View style={{width: '45%'}}>
            <Text
              style={{
                marginVertical: '5%',
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
              }}>
              End Date
            </Text>
            <TextInput
              value={endDate}
              onChangeText={text => setEndDate(text)}
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.3)',
                borderRadius: 4,
                backgroundColor: 'white',
                paddingHorizontal: '5%',
              }}
              placeholder={'dd/mm/yy'}
            />
          </View>
        </View>
        {/* CheckBox */}
        <TouchableOpacity
          onPress={() => setIsStoresModalVisible(true)}
          style={{
            marginTop: '5%',
            width: '100%',
            height: '3%',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 2,
            shadowOpacity: 1.0,
            elevation: 5,
          }}>
          <Text>Select Influencer Stores*</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 22, color: 'black', marginTop: '4%'}}>
          Coupon Naming
        </Text>
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Coupon Code*
        </Text>
        <TextInput
          value={couponCode}
          onChangeText={text => setCouponCode(text)}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Enter Coupon Short Name'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Coupon Title*
        </Text>
        <TextInput
          value={couponTitle}
          onChangeText={text => setCouponTitle(text)}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Enter Coupon Title'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Coupon Name*
        </Text>
        <TextInput
          value={couponName}
          onChangeText={text => setCouponName(text)}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Enter Coupon Name'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Coupon Details*
        </Text>
        <TextInput
          value={couponDescription}
          onChangeText={text => setCouponDescription(text)}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          numberOfLines={8}
          textAlignVertical="top"
          placeholder={'Enter Coupon Details'}
        />
        <TouchableOpacity onPress={onCreatePress} style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Create</Text>
        </TouchableOpacity>
        {(voucherResponse.error || fieldError) && (
          <Text style={{textAlign: 'center', marginTop: '1%'}}>
            Select the required fields
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default CreateCouponScreen;

const styles = StyleSheet.create({
  createCouponContainer: {
    flex: 1,
    paddingBottom: '15%',
  },
  button: {
    height: '3%',
    borderRadius: 5,
    width: '30%',
    alignSelf: 'center',
    marginVertical: '5%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
