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
import Checkbox from '../../components/Checkbox';
import TaggedComponent from '../../components/TaggedComponent';
import {useMutation, useQuery} from '@apollo/client';
import {GET_PRODUCT_TYPES, GET_SIZE_VALUES} from './queries';
import {CREATE_PRODUCT, CREATE_PRODUCT_IMAGE} from './mutations';
import {setStoreProducts} from '../../redux/reducers/storeReducer';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {GET_COLOR_VALUES} from '../ProductsTabScreen/queries';
import {ReactNativeFile} from 'apollo-upload-client';
import {GET_AUTHORISED_BRANDS} from '../DashboardScreen/queries';
//import GestureRecognizer from 'react-native-swipe-gestures';
const ErrorMessage = ({message}) => {
  return (
    <View style={styles.errorMessageContainer}>
      <Text style={styles.errorMessageText}>
        {message ? message : 'This Field is required*'}
      </Text>
    </View>
  );
};
const CreateProductScreen = ({navigation, route}) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [isPriceError, setisPriceError] = useState(false);
  const [isStockError, setIsStockError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDescriptionError, setIsDescriptionError] = useState(false);
  const [productType, setProductType] = useState('UHJvZHVjdFR5cGU6NjU=');
  const [isColorModalVisible, setIsColorModalVisible] = useState(false);
  const [productTypeItems, setProductTypeItems] = useState([]);
  const [image, setImage] = useState();
  const [sizeAttributeId, setSizeAttributeId] = useState('');
  const [sizeAttributeValues, setSizeAttributeValues] = useState([]);
  const [colorAttributeId, setColorAttributeId] = useState('');
  const [colorAttributeValues, setColorAttributeValues] = useState([]);
  const [colorItem, setColorItem] = useState();
  const [variations, setVariations] = useState([]);
  const [newProductId, setNewProductId] = useState();
  const [isProductTypeModalVisible, setIsProductTypeModalVisible] =
    useState(false);
  const [variationsError, setVariationsError] = useState(false);
  const brandId = useSelector(state => state.user.authorisedBrands[0]?.id);
  console.log(brandId);

  const colorResponse = useQuery(GET_COLOR_VALUES);
  useEffect(() => {
    if (colorResponse.data) {
      console.log(colorResponse.data);
      const newColorAttributeId =
        colorResponse.data.attributes.edges[0].node?.id;
      const newColorAttributeValues =
        colorResponse.data.attributes.edges[0].node.values
          .slice(0, 10)
          .map(value => {
            return {id: value.id, name: value.name};
          });
      setColorAttributeId(newColorAttributeId);
      setColorItem(newColorAttributeValues[0]);
      setColorAttributeValues(newColorAttributeValues);
    }
  }, [colorResponse.data]);
  useEffect(() => {
    if (colorResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [colorResponse.loading]);
  const sizeResponse = useQuery(GET_SIZE_VALUES);
  useEffect(() => {
    if (sizeResponse.data) {
      console.log('sizeResponse:', sizeResponse.data);
      /*const newSizeAttributeId = sizeResponse.data.attributes.edges[5].node.id;
      const newSizeAttributeValues =
        sizeResponse.data.attributes.edges[5].node.values.map(value => {
          return {
            name: value.name,
            id: value.id,
            isSelected: false,
          };
        });
      setSizeAttributeId(newSizeAttributeId);
      setSizeAttributeValues(newSizeAttributeValues);*/
      const newSizeAttributeValues = sizeResponse.data.attribute.values.map(
        value => {
          return {
            name: value.name,
            id: value.name,
            isSelected: false,
          };
        },
      );
      setSizeAttributeId(sizeResponse.data.attribute?.id);
      setSizeAttributeValues(newSizeAttributeValues);
    }
  }, [sizeResponse.data]);
  useEffect(() => {
    if (sizeResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [sizeResponse.loading]);
  const ModalItem = ({
    colorItem,
    name,
    value,
    selectedItem,
    setSelectedItem,
  }) => {
    console.log(selectedItem, name, value);
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
  const {data, error, loading} = useQuery(GET_PRODUCT_TYPES);
  useEffect(() => {
    if (data) {
      const newProductTypes = data.productTypes.edges.map(({node}) => {
        return node;
      });
      console.log('Product Types:', newProductTypes);
      setProductTypeItems(newProductTypes);
    }
  }, [data]);
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
  console.log(brandId);
  const products = useSelector(state => state.store.products);
  let productInput = {
    productType: productType,
    name: productName,
    brand: brandId,
    description: productDescription,
    basePrice: parseInt(price),
  };

  const [productCreate, productResponse] = useMutation(CREATE_PRODUCT, {
    variables: {
      input: productInput,
    },
    refetchQueries: [GET_AUTHORISED_BRANDS],
  });
  const file = new ReactNativeFile({
    uri: image?.uri,
    type: image?.type,
    name: image?.fileName,
  });

  const [productImageCreate, productImageResponse] = useMutation(
    CREATE_PRODUCT_IMAGE,
    {
      variables: {
        image: file,
        product: newProductId,
      },
    },
  );
  useEffect(() => {
    if (productImageResponse.data) {
      navigation.navigate('CreateVariantScreen', {
        variations: variations,
        productID: newProductId,
      });
    }
  }, productImageResponse.data);
  useEffect(() => {
    if (newProductId && newProductId !== '') {
      productImageCreate();
    }
  }, [newProductId]);
  useEffect(() => {
    if (productImageResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [productImageResponse.loading]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (productResponse.data) {
      console.log('Created Product:', productResponse.data);
      const newProducts = [
        ...products,
        {
          id: productResponse.data.productCreate.product.id,
          name: productResponse.data.productCreate.product.name,
          brandName: productResponse.data.productCreate.product.brand.brandName,
          price: 0,
          thumbnail: productResponse.data.productCreate.product.thumbnail
            ? productResponse.data.productCreate.product.thumbnail.url
            : 'https://media-exp1.licdn.com/dms/image/C4E0BAQGymyKm7OE3wg/company-logo_200_200/0/1636442519943?e=2159024400&v=beta&t=19hHu3puobGsregS0-31D-KiANWe3NqrKZESktzQC30',
        },
      ];
      setNewProductId(productResponse.data.productCreate.product.id);
      dispatch(setStoreProducts(newProducts));
      dispatch(setLoaderStatus(false));
      toastService.showToast(
        `Product created succesfully:${productResponse.data.productCreate.product.name}`,
        true,
      );
    }
  }, [productResponse.data]);
  useEffect(() => {
    if (productResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [productResponse.loading]);
  const onPressCreate = () => {
    //dispatch(setLoaderStatus(true));
    let flag = 0;
    if (!productType) flag++;
    if (!price || price === '') {
      setisPriceError(true);
      flag++;
    }
    if (!productName || productName === '') {
      setIsNameError(true);
      flag++;
    }
    if (!image) {
      flag++;
      setImageError(true);
    }
    if (!productDescription || productDescription === '') {
      flag++;
      setIsDescriptionError(true);
    }
    if (variations.length === 0) {
      flag++;
      setVariationsError(true);
    }
    if (flag > 0) return;
    productCreate();
    /*const variationsCreate = variations.map(variation => {
      return {
        ...variation,
        price: '',
        stock: '',
      };
    });
    navigation.navigate('CreateVariantScreen', {
      variations: variationsCreate,
    });*/
  };
  const imageAddHandler = () => {
    launchImageLibrary({}, res => {
      console.log(res);
      if (res.didCancel) {
        return;
      } else {
        setImage(res.assets[0]);
        console.log(res.assets[0]);
      }
    });
  };
  const onVariationCreate = () => {
    let newVariations = [];
    for (let i = 0; i < sizeAttributeValues.length; i++) {
      if (sizeAttributeValues[i].isSelected) {
        const isAlreadyAdded = variations.some(variation => {
          return (
            variation.name ===
            colorItem.name + ',' + sizeAttributeValues[i].name
          );
        });
        if (!isAlreadyAdded) {
          newVariations.push({
            name: colorItem.name + ',' + sizeAttributeValues[i].name,
            attributes: [
              {id: colorAttributeId, values: [colorItem.id]},
              {id: sizeAttributeId, values: [sizeAttributeValues[i].id]},
            ],
          });
        }
      }
    }
    setVariations([...variations, ...newVariations]);
  };
  console.log('Variations:', variations);
  const onVariationDelete = variationName => {
    const variationsAfterDelete = variations.filter(
      variation => variation.name !== variationName,
    );
    setVariations(variationsAfterDelete);
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
      <Modal visible={isColorModalVisible} transparent={true}>
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
              Select Color
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
              data={colorAttributeValues}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <ModalItem
                  colorItem={item}
                  selectedItem={colorItem}
                  setSelectedItem={setColorItem}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setIsColorModalVisible(false)}
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

      <Header navigation={navigation} back />
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
            {image && (
              <Image
                source={{uri: image.uri}}
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
          {imageError && (
            <ErrorMessage message={'Please add an image for your product!'} />
          )}
          {/*<View style={styles.selectCategoryContainer}>
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
          </View>*/}

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
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
                marginVertical: '4%',
              }}>
              {variations.map(variation => (
                <TaggedComponent
                  tag={variation.name}
                  variations={variations}
                  onDelete={onVariationDelete}
                />
              ))}
            </View>
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
          <View style={styles.selectCategoryContainer}>
            <Text style={styles.labelText}>Select Color</Text>
            <View
              style={{
                height: 50,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                backgroundColor: 'white',
                marginTop: '2%',
                borderRadius: 5,
                flexDirection: 'row',
                paddingHorizontal: '2%',
                marginBottom: '2%',
              }}>
              <Text>{colorItem ? colorItem.name : 'Select Color'}</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsColorModalVisible(true);
                }}
                style={{
                  height: '80%',
                  width: '30%',
                  borderRadius: 4,
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>Pick</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',

              marginVertical: '4%',
            }}>
            {sizeAttributeValues.map(value => {
              return (
                <Checkbox
                  key={value}
                  item={value}
                  setItems={setSizeAttributeValues}
                  items={sizeAttributeValues}
                />
              );
            })}
          </View>

          <TouchableOpacity onPress={onVariationCreate}>
            <View
              style={{
                ...styles.nextButtonContainer,
                backgroundColor: 'whitesmoke',
              }}>
              <View style={{...styles.nextButton, backgroundColor: 'gray'}}>
                <Text style={styles.nextButtonText}>Add Variations</Text>
              </View>
            </View>
          </TouchableOpacity>
          {variationsError && (
            <ErrorMessage
              message={'Please add Variants before creating product*'}
            />
          )}
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
