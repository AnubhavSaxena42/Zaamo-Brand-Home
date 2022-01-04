// @ts-nocheck

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../components/Header';

import Dropdown from '../../components/Dropdown';
import Checkbox from '../../components/Checkbox';
import TaggedComponent from '../../components/TaggedComponent';
import {useMutation, useQuery} from '@apollo/client';
import {GET_PRODUCT_TYPES} from './queries';
import {CREATE_PRODUCT} from './mutations';
import {setStoreProducts} from '../../redux/reducers/storeReducer';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//import GestureRecognizer from 'react-native-swipe-gestures';
const ErrorMessage = () => {
  return (
    <View style={styles.errorMessageContainer}>
      <Text style={styles.errorMessageText}>This Field is required*</Text>
    </View>
  );
};
const CreateProductScreen = ({navigation, route}) => {
  const [contentFormat, setContentFormat] = useState();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [isPriceError, setisPriceError] = useState(false);
  const [isStockError, setIsStockError] = useState(false);
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [newVariation, setNewVariation] = useState('');
  const [productType, setProductType] = useState('');
  const [productTypeItems, setProductTypeItems] = useState([]);
  const [isVariationNameError, setIsVariationNameError] = useState(false);
  const [trigger, setTrigger] = useState(true);
  const [imageUri, setImageUri] = useState();
  const [codCheckbox, setCodCheckbox] = useState([
    {value: 'Allow COD', isSelected: false},
  ]);
  const [isProductTypeModalVisible, setIsProductTypeModalVisible] =
    useState(false);
  const brandId = useSelector(state => state.user.authorisedBrands[0].id);
  console.log(brandId);
  const ModalItem = ({name, value, selectedItem, setSelectedItem}) => {
    console.log(selectedItem, name, value);
    const onPressHandler = () => {
      if (selectedItem === value) {
        return;
      } else {
        setSelectedItem(value);
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
          backgroundColor: selectedItem === value ? 'black' : 'white',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: selectedItem === value ? 'white' : 'black',
          }}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };
  console.log(productType);
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
    height: 50,
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
    top: -110,
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

  const [variationCheckboxes, setVariationCheckboxes] = useState([
    {value: 'XS', isSelected: false},
    {value: 'S', isSelected: false},
    {value: 'M', isSelected: false},
    {value: 'L', isSelected: false},
    {value: 'XL', isSelected: false},
    {value: 'XXL', isSelected: false},
  ]);
  const {data, error, loading} = useQuery(GET_PRODUCT_TYPES);
  useEffect(() => {
    if (data) {
      const newProductTypes = data.productTypes.edges.map(({node}) => {
        return node;
      });
      console.log(newProductTypes);
      setProductTypeItems(newProductTypes);
    }
  }, [data]);
  const [variations, setVariations] = useState([]);
  const contentFormatItems = [
    'All',
    'Insta Highlight',
    'Insta Story',
    'Insta Reel',
    'Insta Video',
    'Static Post',
    'Uncategorized',
  ];
  const onSubmitHandler = () => {
    let flag = 0;
    if (productName === '') {
      setIsNameError(true);
      flag++;
    }
    if (price === '') {
      setisPriceError(true);
      flag++;
    }
    if (stock === '') {
      setIsStockError(true);
      flag++;
    }
    if (productDescription === '') {
      setIsDescriptionError(true);
      flag++;
    }
    if (flag > 0) return;
    else {
      navigation.navigate('variants', {variations});
    }
  };
  const products = useSelector(state => state.store.products);
  const addNewVariationHandler = () => {
    if (newVariation === '') {
      setIsVariationNameError(true);
      return;
    } else {
      let newVariations = variations;
      variationCheckboxes.forEach(item => {
        if (item.isSelected)
          newVariations.push(`${newVariation},${item.value}`);
      });
      setVariations(newVariations);
      setTrigger(!trigger);
    }
  };
  const removeVariationHandler = value => {
    let updatedVariations = [];
    variations.map(item => {
      if (item !== value) updatedVariations.push(item);
    });
    setVariations(updatedVariations);
    setTrigger(!trigger);
  };
  let productInput = {
    productType: productType,
    name: productName,
    brand: brandId,
    description: productDescription,
    basePrice: parseInt(price),
  };
  console.log(productInput);
  const [productCreate, productResponse] = useMutation(CREATE_PRODUCT, {
    variables: {
      input: productInput,
    },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (productResponse.data) {
      console.log(productResponse.data);
      const newProducts = [
        ...products,
        {
          id: productResponse.data.productCreate.product.id,
          name: productResponse.data.productCreate.product.name,
          brandName: productResponse.data.productCreate.product.brand.brandName,
          price: 0,
          thumbnail:
            'https://media-exp1.licdn.com/dms/image/C4E0BAQGymyKm7OE3wg/company-logo_200_200/0/1636442519943?e=2159024400&v=beta&t=19hHu3puobGsregS0-31D-KiANWe3NqrKZESktzQC30',
        },
      ];
      dispatch(setStoreProducts(newProducts));
      dispatch(setLoaderStatus(false));
      toastService.showToast(
        `Product created succesfully:${productResponse.data.productCreate.product.name}`,
        true,
      );
      navigation.navigate('ProductsTabScreen');
    } else {
      console.log('in else');
      dispatch(setLoaderStatus(false));
      toastService.showToast('Failed to create product,try again', true);
    }
  }, [productResponse.data]);

  const onPressCreate = () => {
    console.log('pressed');
    dispatch(setLoaderStatus(true));

    productCreate();
  };
  const imageAddHandler = () => {
    launchImageLibrary({}, res => {
      console.log(res);
      if (res.didCancel) {
        return;
      } else {
        setImageUri(res.assets[0].uri);
        console.log(res.assets[0]);
      }
    });
  };
  return (
    <ScrollView style={{backgroundColor: 'rgba(229, 229, 229, 0.2);'}}>
      {/*<GestureRecognizer
        config={{directionalOffsetThreshold: 30, velocityThreshold: 0.5}}
        onSwipeRight={() => navigation.goBack()}>*/}
      <Modal visible={isProductTypeModalVisible} transparent={true}>
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
              Select Product Type
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
              data={productTypeItems}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <ModalItem
                  name={item.name}
                  value={item.id}
                  selectedItem={productType}
                  setSelectedItem={setProductType}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setIsProductTypeModalVisible(false)}
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
      <Header />
      <View style={styles.createProductContainer}>
        <View style={styles.createProductHeaderContainer}>
          <Text style={styles.createProductHeaderText}>Create product</Text>
        </View>
        <View style={styles.productDetailsContainer}>
          <View style={styles.productDetailsHeaderContainer}>
            <Text style={styles.headerText}>Product Details</Text>
          </View>
          <View style={styles.productNameInputContainer}>
            <Text style={styles.labelText}>Product Name</Text>
            <TextInput
              onChangeText={text => {
                setProductName(text);
                setIsNameError(false);
              }}
              value={productName}
              style={styles.input}
            />
            {isNameError && <ErrorMessage />}
          </View>

          <View style={styles.productPriceStockInputContainer}>
            <View style={styles.priceInputContainer}>
              <Text style={styles.labelText}>Base Price</Text>
              <TextInput
                onChangeText={text => {
                  setPrice(text);
                  setisPriceError(false);
                }}
                value={price}
                keyboardType="number-pad"
                style={styles.priceInput}
              />
              {isPriceError && <ErrorMessage />}
            </View>
            {/* <View style={styles.stockInputContainer}>
              <Text style={styles.labelText}>Stock</Text>
              <TextInput
                onChangeText={text => {
                  setStock(text);
                  setIsStockError(false);
                }}
                keyboardType="number-pad"
                value={stock}
                style={styles.stockInput}
              />
              {isStockError && <ErrorMessage />}
            </View>*/}
          </View>
          <Text style={{...styles.labelText, marginVertical: '2%'}}>
            Add Image
          </Text>
          <View style={styles.imageContainer}>
            {imageUri && (
              <Image
                source={{uri: imageUri}}
                resizeMode="contain"
                style={{width: 100, height: '100%'}}
              />
            )}
            <TouchableOpacity
              onPress={() => imageAddHandler()}
              style={{
                width: '30%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="camera" color="darkgray" size={35} />
            </TouchableOpacity>
          </View>
          <View style={styles.selectCategoryContainer}>
            <Text style={styles.labelText}>Select Product Types</Text>
            <TouchableOpacity
              onPress={() => {
                setIsProductTypeModalVisible(true);
              }}
              style={{
                height: 50,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                backgroundColor: 'white',
                marginTop: '2%',
                borderRadius: 5,
              }}>
              <Text>Select Product Type</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productDescriptionInputContainer}>
            <Text style={styles.labelText}>Product Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={10}
              style={styles.productDescriptionInput}
              onChangeText={text => {
                setProductDescription(text);
                setIsDescriptionError(false);
              }}
              value={productDescription}
            />
            {isDescriptionError && <ErrorMessage />}
          </View>

          {/*
          <View style={styles.selectSubCategoryContainer}>
            <Text style={styles.labelText}>Select Sub Category</Text>
            <Dropdown
              tag="Select Sub Category"
              items={contentFormatItems}
              selectedValue={contentFormat}
              setSelectedValue={setContentFormat}
              dropDownStyle={{zIndex: 400}}
            />
          </View>*/}
          {/*<View style={styles.codCheckboxContainer}>
            {codCheckbox.map(item => {
              return (
                <Checkbox
                  key={item.value}
                  item={item}
                  items={codCheckbox}
                  setItems={setCodCheckbox}
                />
              );
            })}
          </View>*/}
          {/*<Text style={styles.labelText}>Variations</Text>*/}
          {/*<View style={styles.variationsContainer}>
            {variations.map(item => (
              <View key={item} style={{marginRight: '10%', marginBottom: '2%'}}>
                <TaggedComponent
                  tag={item}
                  onDelete={() => {
                    removeVariationHandler(item);
                  }}
                />
              </View>
            ))}
          </View>*/}
        </View>
        {/*<View style={{height: '2%', backgroundColor: 'white'}}></View>

        <View style={styles.addVariantsContainer}>
          <View style={styles.addVariantsHeaderContainer}>
            <Text style={styles.headerText}>Add Variants(Optional)</Text>
          </View>
          <View style={styles.variantNameInputContainer}>
            <Text style={styles.labelText}>Variant Name</Text>
            <TextInput
              value={newVariation}
              onChangeText={text => {
                setNewVariation(text);
                setIsVariationNameError(false);
              }}
              style={styles.input}
            />
            {isVariationNameError && <ErrorMessage />}
          </View>
          <View style={styles.variantCheckboxContainer}>
            {variationCheckboxes.map(item => {
              return (
                <View key={item.value} style={{margin: '3%'}}>
                  <Checkbox
                    key={item.value}
                    items={variationCheckboxes}
                    item={item}
                    setItems={setVariationCheckboxes}
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.addVariationButtonContainer}>
            <TouchableOpacity onPress={addNewVariationHandler}>
              <View style={styles.addVariationButton}>
                <Text style={styles.addVariationButtonText}>Add Variation</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>*/}
        <TouchableOpacity
          onPress={
            route.params.fromBrandHome
              ? () => {
                  onPressCreate();
                }
              : onSubmitHandler
          }>
          <View style={styles.nextButtonContainer}>
            <View style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Next</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/*</GestureRecognizer>*/}
    </ScrollView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  createProductContainer: {
    flex: 1,
  },
  createProductHeaderContainer: {
    backgroundColor: 'white',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  createProductHeaderText: {
    color: 'black',
    fontSize: 28,
    fontWeight: '600',
  },
  errorMessageContainer: {
    marginTop: '1%',
  },
  errorMessageText: {
    fontSize: 12,
    color: 'red',
  },
  productDetailsContainer: {
    backgroundColor: 'whitesmoke',
    paddingHorizontal: '5%',
    paddingTop: 10,
  },
  productDetailsHeaderContainer: {},
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
    marginTop: '3%',
  },
  productNameInputContainer: {},
  labelText: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: '3%',
  },
  imageContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
  },
  productPriceStockInputContainer: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: '2%',
    backgroundColor: 'white',
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: '2%',
    marginRight: '2%',
    backgroundColor: 'white',
  },
  productDescriptionInput: {
    borderWidth: 1,
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: '2%',
    height: 200,
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  stockInput: {
    borderWidth: 1,
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: '2%',
    backgroundColor: 'white',
  },
  priceInputContainer: {
    width: '50%',
  },
  stockInputContainer: {
    width: '50%',
  },
  productDescriptionInputContainer: {},
  selectCategoryContainer: {},
  selectSubCategoryContainer: {},
  codCheckboxContainer: {
    marginVertical: '5%',
  },
  variationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',

    marginVertical: '5%',
  },
  addVariantsContainer: {
    paddingHorizontal: '5%',
  },
  addVariantsHeaderContainer: {},
  variantNameInputContainer: {},
  variantCheckboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: '5%',
  },
  addVariationButtonContainer: {
    alignItems: 'center',
    marginVertical: '3%',
  },
  addVariationButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '35%',
    padding: '3%',
    borderRadius: 10,
  },
  addVariationButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  nextButtonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingVertical: '5%',
    marginTop: '5%',
  },
  nextButton: {
    backgroundColor: 'black',
    width: '50%',
    padding: '3%',
    marginBottom: '5%',
    borderRadius: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
