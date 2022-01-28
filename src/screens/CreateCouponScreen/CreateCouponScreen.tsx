import {useMutation, useQuery} from '@apollo/client';
import React, {useState, useEffect} from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  FlatList,
  SafeAreaView,
  Platform,
  View,
} from 'react-native';
import Checkbox from '../../components/Checkbox';
import DatePicker from 'react-native-date-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Header';
import {CREATE_VOUCHER} from './mutations';
import {useDispatch, useSelector} from 'react-redux';
import {GET_STORES, GET_BRANDS} from './queries';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
import {GET_COUPONS} from '../DashboardScreen/queries';
import {styles} from './styles';
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
  shadowOpacity: 0.5,
  elevation: 2,
  zIndex: 200,
};

const mobileDropdownStyle = {
  height: 35,
  width: '100%',
  borderRadius: 5,
  alignItems: 'center',
  borderColor: 'rgba(0,0,0,0.2)',
  paddingHorizontal: 5,
  borderWidth: 1,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowRadius: 1,
  shadowOpacity: 0.5,
  elevation: 5,
  zIndex: 200,
};
const mobileDropdownValuesContainerStyle = {
  top: 34,
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
  fontWeight: '300',
  color: 'rgba(0, 0, 0, 0.75)',
};
const webDropdownTextStyle = {
  fontSize: 16,
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
  const authorisedBrands = useSelector(state => state.user.authorisedBrands);
  const [couponType, setCouponType] = useState('');
  const [selectedStores, setSelectedStores] = useState([]);
  const [date, setDate] = useState(new Date());
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [selectDateToggle, setSelectDateToggle] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [isStoresModalVisible, setIsStoresModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [couponTypeItems, setCouponTypeItems] = useState([
    {id: 'SHIPPING', name: 'Shipping'},
    {id: 'SPECIFIC_PRODUCT', name: 'Specific Product'},
  ]);
  const [upperLimit, setUpperLimit] = useState();
  const [minValue, setMinValue] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [influencerStore, setInfluencerStore] = useState('');
  const [influencerStoreItems, setInfluencerStoreItems] = useState([]);
  const [brandItems, setBrandItems] = useState();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [couponCode, setCouponCode] = useState('');
  const [couponTitle, setCouponTitle] = useState('');
  const [couponName, setCouponName] = useState('');
  const [couponDescription, setCouponDescription] = useState('');
  const [discountValue, setDiscountValue] = useState();
  const [couponTypeFieldError, setCouponTypeFieldError] = useState(false);
  const [couponCodeFieldError, setCouponCodeFieldError] = useState(false);
  const [selectedBrandsItems, setSelectedBrandsItems] = useState([]);
  const dispatch = useDispatch();
  const [selectedStoresFieldError, setSelectedStoresFieldError] =
    useState(false);
  const [discountTypeFieldError, setDiscountTypeFieldError] = useState(false);
  const [discountValueFieldError, setDiscountValueFieldError] = useState(false);
  const [selectedBrandsFieldError, setSelectedBrandsFieldError] =
    useState(false);
  const [ownerFieldError, setOwnerFieldError] = useState(false);
  const [couponNameFieldError, setCouponNameFieldError] = useState(false);
  const [couponTitleFieldError, setCouponTitleFieldError] = useState(false);
  const [couponDescriptionFieldError, setCouponDescriptionFieldError] =
    useState(false);
  const storesResponse = useQuery(GET_STORES);
  const brandsResponse = useQuery(GET_BRANDS);
  const ErrorMessage = () => {
    return (
      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessageText}>This Field is required*</Text>
      </View>
    );
  };
  let input = {
    type: couponType,
    name: couponName,
    discountValueType: discountType,
    discountValue: discountValue,
    owner: owner,
    metadata: [
      {
        key: 'description',
        value: couponDescription,
      },
      {
        key: 'title',
        value: couponTitle,
      },
    ],
  };
  console.log('Input:', input);
  console.log('Brand Items:', brandItems);
  useEffect(() => {
    setOwner('ZAAMO');
  }, []);
  useEffect(() => {
    if (brandsResponse.data) {
      const newBrandItems = brandsResponse.data.brands.edges.map(({node}) => {
        return {
          id: node.id,
          name: node.brandName,
        };
      });
      setAllBrandsItems(newBrandItems);
      setBrandItems(newBrandItems);
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
      setCouponTypeFieldError(true);
      return;
    }
    if (!couponName || couponName === '') {
      setCouponNameFieldError(true);
      return;
    }
    if (!couponTitle || couponTitle === '') {
      setCouponTitleFieldError(true);
    }

    if (!selectedStores || selectedStores.length === 0) {
      setSelectedStoresFieldError(true);
      return;
    }
    if (!discountType || discountType === '') {
      setDiscountTypeFieldError(true);
      return;
    }
    if (!discountValue || discountValue === '') {
      setDiscountValueFieldError(true);
      return;
    }
    if (
      couponType === 'SPECIFIC_PRODUCT' &&
      (!selectedBrands || selectedBrands.length === 0)
    ) {
      setSelectedBrandsFieldError(true);
      return;
    }
    if (!owner || owner === '') {
      setOwnerFieldError(true);
      return;
    }
    if (!couponDescription || couponDescription === '') {
      setCouponDescriptionFieldError(true);
      return;
    }
    if (minValue !== '') input.minAmountSpent = parseInt(minValue);
    if (minQuantity !== '')
      input.minCheckoutItemsQuantity = parseInt(minQuantity);
    if (upperLimit !== '') input.maxDiscountValue = parseInt(upperLimit);
    if (couponType === 'SPECIFIC_PRODUCT' || couponType === 'SHIPPING') {
      input.brands = selectedBrands;
    }
    if (selectDateToggle) {
      input.startDate = startDate.toISOString();
      input.endDate = endDate.toISOString();
    }
    if (
      couponType === 'SPECIFIC_PRODUCT' &&
      selectedProducts &&
      selectedProducts.length !== 0
    ) {
      input.products = selectedProducts;
    }
    console.log('New Input:', JSON.stringify(input));
    voucherBulkCreate();
  };
  const [voucherBulkCreate, voucherResponse] = useMutation(CREATE_VOUCHER, {
    variables: {
      input: input,
      stores: selectedStores,
    },
    refetchQueries: [GET_COUPONS],
  });
  useEffect(() => {
    if (voucherResponse.data) {
      console.log('in use effect:', voucherResponse.data);
      if (voucherResponse.data.voucherBulkCreate.success) {
        toastService.showToast('Coupon has been created succesfully!', true);
        navigation.navigate('MarketingScreen');
      } else {
        toastService.showToast('Coupon Creation failed,try again.', true);
      }
    }
    dispatch(setLoaderStatus(false));
  }, [voucherResponse.data]);
  useEffect(() => {
    if (voucherResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [voucherResponse.loading]);
  useEffect(() => {
    if (startDate > endDate) setEndDate(startDate);
  }, [startDate]);
  useEffect(() => {
    if (owner && owner === 'ZAAMO') {
      setBrandItems(allBrandsItems);
    } else {
      setBrandItems(authorisedBrands);
    }
  }, [owner]);

  console.log('Selected Stores:', JSON.stringify(selectedStores));
  console.log('Selected Brands:', selectedBrands);
  console.log('Selected Products:', selectedProducts);

  const ModalItem = ({name, value, selectedItems, setSelectedItems}) => {
    const onPressHandler = () => {
      if (selectedItems.includes(value)) {
        const newSelectedItems = selectedItems.filter(item => item !== value);
        const newSelectedBrandsItems = selectedBrandsItems.filter(
          item => item.value !== value,
        );
        setSelectedBrandsItems(newSelectedBrandsItems);
        setSelectedItems(newSelectedItems);
      } else {
        const addSelectedItems = [...selectedItems, value];
        const addSelectedBrandsItems = [
          ...selectedBrandsItems,
          {id: value, name: name},
        ];
        setSelectedItems(addSelectedItems);
        setSelectedBrandsItems(addSelectedBrandsItems);
      }
    };
    return (
      <TouchableOpacity
        onPress={onPressHandler}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
          paddingVertical: '2%',
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
    <SafeAreaView style={styles.createCouponScreenContainer}>
      <ScrollView
        contentContainerStyle={{paddingBottom: '5%'}}
        style={styles.createCouponContainer}>
        <Header
          tag={'Create Coupon'}
          navigation={navigation}
          back
          fontSize={22}
        />
        <Modal
          visible={isBrandsModalVisible}
          transparent={true}
          onRequestClose={() => setIsBrandsModalVisible(false)}>
          <SafeAreaView style={styles.brandsModalContainer}>
            <View style={styles.brandsModalContentContainer}>
              <Text style={styles.brandsModalHeaderText}>Select Brands</Text>
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
                style={styles.brandsModalConfirmButton}>
                <Text style={styles.brandsModalConfirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
        <Modal
          visible={isStoresModalVisible}
          onRequestClose={() => setIsStoresModalVisible(false)}
          transparent={true}>
          <SafeAreaView style={styles.storesModalContainer}>
            <Text style={styles.storesModalHeaderText}>
              Select Influencer Stores
            </Text>

            <View style={styles.storesModalContentContainer}>
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

            <TouchableOpacity
              onPress={() => setIsStoresModalVisible(false)}
              style={styles.storesModalConfirmButton}>
              <Text style={styles.storesModalConfirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
        <View style={styles.createCouponContentContainer}>
          <Text style={styles.couponDetailsHeaderText}>Coupon Details</Text>
          <Text style={styles.createCouponLabelText}>Select Coupon Type*</Text>
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
          {couponType !== '' && (
            <View style={styles.selectedConfirmedContainer}>
              <Entypo name="check" size={15} color={'black'} />
              <Text style={styles.selectedConfirmedText}>
                Coupon Type Selected
              </Text>
            </View>
          )}
          {couponTypeFieldError && <ErrorMessage />}
          <Text style={styles.createCouponLabelText}>
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
          {discountType !== '' && (
            <View style={styles.selectedConfirmedContainer}>
              <Entypo name="check" size={15} color={'black'} />
              <Text style={styles.selectedConfirmedText}>
                Discount Type Selected
              </Text>
            </View>
          )}
          {discountTypeFieldError && <ErrorMessage />}
          <Text style={styles.createCouponLabelText}>Discount Value*</Text>
          <TextInput
            value={discountValue}
            onChangeText={text => {
              setDiscountValue(parseInt(text));
            }}
            style={styles.inputStyle}
            placeholder={'Enter Discount Value'}
          />
          {discountValueFieldError && <ErrorMessage />}
          <Text style={styles.createCouponLabelText}>Upper Limit</Text>
          <TextInput
            value={upperLimit}
            onChangeText={text => {
              setUpperLimit(parseInt(text));
            }}
            style={styles.inputStyle}
            placeholder={'Select Upper Limit'}
          />
          <Text style={styles.createCouponLabelText}>Minimum Order</Text>
          <View style={styles.minimumOrderContainer}>
            <View style={styles.minimumOrderSectionContainer}>
              <Text style={styles.createCouponLabelText}>Value</Text>
              <TextInput
                keyboardType="number-pad"
                value={minValue}
                onChangeText={text => setMinValue(parseInt(text))}
                style={styles.inputStyle}
                placeholder={'Rs.599'}
              />
            </View>
            <View style={styles.minimumOrderSectionContainer}>
              <Text style={styles.createCouponLabelText}>Quantity</Text>
              <TextInput
                value={minQuantity}
                keyboardType="number-pad"
                onChangeText={text => setMinQuantity(parseInt(text))}
                style={styles.inputStyle}
                placeholder={'4'}
              />
            </View>
          </View>
          {couponType === 'SPECIFIC_PRODUCT' && (
            <View style={styles.selectBrandsContainer}>
              <Text style={styles.createCouponLabelText}>Select Brands*</Text>
              <View style={styles.selectBrandsBox}>
                <Text style={styles.selectBrandsText}>Select Brands*</Text>
                <TouchableOpacity
                  onPress={() => setIsBrandsModalVisible(true)}
                  style={styles.selectBrandsButton}>
                  <Text style={styles.selectBrandsButtonText}>Pick Brands</Text>
                </TouchableOpacity>
              </View>
              {selectedBrands.length !== 0 && (
                <View style={styles.selectedConfirmedContainer}>
                  <Entypo name="check" size={15} color={'black'} />
                  <Text style={styles.selectBrandsText}>Brands Selected</Text>
                </View>
              )}
              {selectedBrandsFieldError && <ErrorMessage />}
            </View>
          )}

          {couponType === 'SPECIFIC_PRODUCT' && (
            <View style={styles.selectProductsContainer}>
              <Text style={styles.createCouponLabelText}>Select Products*</Text>
              <View style={styles.selectProductsBox}>
                <Text style={styles.selectProductsText}>Select Products*</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('CollectionProductsAddScreen', {
                      setProducts: setSelectedProducts,
                      products: selectedProducts,
                      fromVoucherCreate: true,
                      brands: selectedBrandsItems,
                    });
                  }}
                  style={styles.selectProductsButton}>
                  <Text style={styles.selectProductsButtonText}>
                    Pick Products
                  </Text>
                </TouchableOpacity>
              </View>
              {selectedProducts.length !== 0 && (
                <View style={styles.selectedConfirmedContainer}>
                  <Entypo name="check" size={15} color={'black'} />
                  <Text style={styles.selectedConfirmedText}>
                    Products Selected
                  </Text>
                </View>
              )}
              {selectedBrandsFieldError && <ErrorMessage />}
            </View>
          )}
          <Text style={styles.createCouponLabelText}>Select Owner*</Text>
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
          {owner !== '' && (
            <View style={styles.selectedConfirmedContainer}>
              <Entypo name="check" size={15} color={'black'} />
              <Text style={styles.selectedConfirmedText}>Owner Selected</Text>
            </View>
          )}
          {ownerFieldError && <ErrorMessage />}
          <Text
            onPress={() => setSelectDateToggle(!selectDateToggle)}
            style={styles.selectDatesContainer}>
            Select Dates
            <Entypo name="arrow-down" size={15} color={'black'} />
          </Text>
          {selectDateToggle && (
            <View style={styles.selectDatesSectionContainer}>
              <View style={styles.selectDatesSubsectionContainer}>
                <Text
                  onPress={() => setStartDateOpen(true)}
                  style={styles.selectDatesSubsectionText}>
                  Select Start Date
                </Text>
                <Text style={styles.selectedDateSubsectionText}>
                  {startDate.toISOString().substring(0, 10)}
                </Text>
                <DatePicker
                  onConfirm={date => {
                    setStartDateOpen(false);
                    setStartDate(date);
                  }}
                  onCancel={() => {
                    setStartDateOpen(false);
                  }}
                  date={startDate}
                  modal
                  open={startDateOpen}
                />
              </View>
              <View style={styles.selectDatesSubsectionContainer}>
                <Text
                  onPress={() => setEndDateOpen(true)}
                  style={styles.selectDatesSubsectionText}>
                  Select End Date
                </Text>
                <Text style={styles.selectedDateSubsectionText}>
                  {endDate.toISOString().substring(0, 10)}
                </Text>
                <DatePicker
                  onConfirm={date => {
                    setEndDateOpen(false);
                    setEndDate(date);
                  }}
                  onCancel={() => {
                    setEndDateOpen(false);
                  }}
                  date={endDate}
                  modal
                  open={endDateOpen}
                />
              </View>
            </View>
          )}
          {/* CheckBox */}
          <Text style={styles.createCouponLabelText}>
            Select Influencer Stores*
          </Text>
          <View style={styles.selectStoresBox}>
            <Text style={styles.selectStoresText}>
              Select Influencer Stores*
            </Text>
            <TouchableOpacity
              onPress={() => setIsStoresModalVisible(true)}
              style={styles.selectStoresButton}>
              <Text style={styles.selectStoresButtonText}>Pick Stores</Text>
            </TouchableOpacity>
          </View>
          {selectedStores.length !== 0 && (
            <View style={styles.selectedConfirmedContainer}>
              <Entypo name="check" size={15} color={'black'} />
              <Text style={styles.selectedConfirmedText}>Stores Selected</Text>
            </View>
          )}
          {selectedStoresFieldError && <ErrorMessage />}
          <Text style={styles.couponNamingHeaderText}>Coupon Naming</Text>
          {/*<Text
          style={{
            marginVertical: '5%',
            fontSize: 15,
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
            color: 'gray',
            height: 40,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Enter Coupon Short Name'}
        />*/}
          {couponCodeFieldError && <ErrorMessage />}
          <Text style={styles.createCouponLabelText}>Coupon Title*</Text>
          <TextInput
            value={couponTitle}
            onChangeText={text => setCouponTitle(text)}
            style={styles.inputStyle}
            placeholder={'Enter Coupon Title'}
          />
          {couponTitleFieldError && <ErrorMessage />}
          <Text style={styles.createCouponLabelText}>Coupon Name*</Text>
          <TextInput
            value={couponName}
            onChangeText={text => setCouponName(text)}
            style={styles.inputStyle}
            placeholder={'Enter Coupon Name'}
          />
          {couponNameFieldError && <ErrorMessage />}
          <Text style={styles.createCouponLabelText}>Coupon Details*</Text>
          <TextInput
            value={couponDescription}
            onChangeText={text => setCouponDescription(text)}
            style={styles.inputStyle}
            multiline={true}
            textAlignVertical="top"
            placeholder={'Enter Coupon Details'}
          />
          {couponDescriptionFieldError && <ErrorMessage />}
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
    </SafeAreaView>
  );
};

export default CreateCouponScreen;
