import {useMutation, useQuery} from '@apollo/client';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
  View,
} from 'react-native';
import Checkbox from '../../components/Checkbox';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Header';
import {CREATE_COUPON} from './mutations';
import {GET_STORES} from './queries';
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
  const [discountType, setDiscountType] = useState('');
  const [owner, setOwner] = useState('');
  const [ownerItems, setOwnerItems] = useState([
    {id: 'ZAAMO', name: 'Zaamo'},
    {id: 'BRAND', name: 'Brand'},
  ]);
  const [discountTypeItems, setDiscountTypeItems] = useState([
    {id: 'PERCENTAGE', name: 'Percentage'},
    {id: 'FIXED', name: 'Fixed'},
  ]);
  const [couponType, setCouponType] = useState('');
  const [couponTypeItems, setCouponTypeItems] = useState([
    {id: 'SHIPPING', name: 'Shipping'},
    {id: 'ENTIRE_ORDER', name: 'Entire Order'},
    {id: 'SPECIFIC_PRODUCT', name: 'Specific Product'},
  ]);
  const [upperLimit, setUpperLimit] = useState();
  const [minValue, setMinValue] = useState();
  const [minQuantity, setMinQuantity] = useState();
  const [influencerStore, setInfluencerStore] = useState('');
  const [influencerStoreItems, setInfluencerStoreItems] = useState([
    {id: 'U3RvcmU6NzE=', name: 'My Store'},
    {id: 'Influencer2', name: 'Influencer_2'},
  ]);
  const [brandItems, setBrandItems] = useState([
    {id: 'QnJhbmQ6MjE=', name: 'Dummy Brand'},
    {id: 'brandID2', name: 'brand2'},
  ]);
  const [brand, setBrand] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponTitle, setCouponTitle] = useState('');
  const [couponName, setCouponName] = useState('');
  const [couponDescription, setCouponDescription] = useState('');
  const [discountValue, setDiscountValue] = useState();
  const storesResponse = useQuery(GET_STORES);
  useEffect(() => {
    if (storesResponse.data) {
      console.log(storesResponse.data);
      const newStoreItems = [
        ...influencerStoreItems,
        ...storesResponse.data.stores.edges.map(({node}) => {
          return {
            id: node.id,
            name: node.storeName,
          };
        }),
      ];
      console.log(newStoreItems);
      setInfluencerStoreItems(newStoreItems);
    }
  }, [storesResponse.data]);
  console.log('uupdaete');
  const [voucherBulkCreate, {data, error, loading}] = useMutation(
    CREATE_COUPON,
    {
      variables: {
        type: couponType,
        name: couponName,
        code: couponCode,
        stores: [influencerStore],
        discountValueType: discountType,
        discountValue: discountValue,
        brands: [brand],
        owner: owner,
        metadata: [
          {
            key: 'description',
            value: couponDescription,
          },
        ],
      },
    },
  );
  useEffect(() => {
    if (data) {
      console.log('CouponData:', data);
    }
  }, [data]);
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: '35%'}}
      style={styles.createCouponContainer}>
      <Header tag={'Marketing'} fontSize={22} />
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
          Select Coupon Type
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
          Select Discount Type
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
          Discount Value
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
          <View>
            <Text
              style={{
                marginVertical: '5%',
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
              }}>
              Select a Brand
            </Text>
            <Dropdown
              tag="Select a Brand"
              items={brandItems}
              selectedValue={brand}
              iconColor="black"
              down
              setSelectedValue={setBrand}
              dropDownContainerStyle={{
                ...mobileDropdownStyle,
                zIndex: 500,
                height: '15%',
              }}
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
          </View>
        )}
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Select Owner
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
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Select Influencer Store
        </Text>
        <Dropdown
          tag="Select Influencer Store"
          items={influencerStoreItems}
          selectedValue={influencerStore}
          iconColor="black"
          down
          setSelectedValue={setInfluencerStore}
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
          Coupon Code
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
          Coupon Title
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
          Coupon Name
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
          Coupon Details
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
        <TouchableOpacity
          onPress={() => voucherBulkCreate()}
          style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Create</Text>
        </TouchableOpacity>
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
