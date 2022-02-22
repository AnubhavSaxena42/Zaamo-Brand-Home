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
  SafeAreaView,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../components/Header';
import Checkbox from '../../components/Checkbox';
import TaggedComponent from '../../components/TaggedComponent';
import {useMutation, useQuery} from '@apollo/client';
import {
  GET_PRODUCT_TYPES,
  GET_AUTHORISED_BRANDS,
  GET_COLOR_VALUES,
  GET_SIZE_VALUES,
} from '../../api/queries';
import {CREATE_PRODUCT, CREATE_PRODUCT_IMAGE} from '../../api/mutations';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ReactNativeFile} from 'apollo-upload-client';

//import GestureRecognizer from 'react-native-swipe-gestures';
import {styles} from './styles';
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
  const [viewableItems, setViewableItems] = useState(5);
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

  const colorResponse = useQuery(GET_COLOR_VALUES);
  useEffect(() => {
    if (colorResponse.data) {
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
          console.log('Size attribute value is this:', value);
          return {
            name: value.name,
            id: value.id,
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
  const {data, error, loading} = useQuery(GET_PRODUCT_TYPES);
  useEffect(() => {
    if (data) {
      const newProductTypes = data.productTypes.edges.map(({node}) => {
        return node;
      });
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
      console.log('Product Image Response Data:', productImageResponse.data);
      navigation.replace('CreateVariantScreen', {
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
    console.log('Created Product data:', productResponse);
    if (productResponse.data) {
      console.log('Created Product :', productResponse.data);
      setNewProductId(productResponse.data.productCreate.product.id);
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
    console.log('Product create Input:', JSON.stringify(productInput));
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
              {id: colorAttributeId, values: [colorItem.name]},
              {id: sizeAttributeId, values: [sizeAttributeValues[i].name]},
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
    console.log('Variation to delete:', variationName);
    setVariations(variationsAfterDelete);
  };
  return (
    <SafeAreaView style={styles.createProductContainer}>
      <ScrollView style={styles.createProductScrollViewContainer}>
        {/*<GestureRecognizer
        config={{directionalOffsetThreshold: 30, velocityThreshold: 0.5}}
        onSwipeRight={() => navigation.goBack()}>*/}
        {/*<Modal
          onRequestClose={() => setIsProductTypeModalVisible(false)}
          visible={isProductTypeModalVisible}
          transparent={true}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            </ScrollView>
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
        </Modal>*/}
        <Modal
          visible={isColorModalVisible}
          onRequestClose={() => setIsColorModalVisible(false)}
          transparent={true}>
          <SafeAreaView style={styles.colorModalContainer}>
            <View style={styles.colorModalHeader}>
              <Text style={styles.colorModalHeaderText}>Select Color</Text>
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
                style={styles.colorModalButton}>
                <Text style={styles.colorModalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

        <Header tag={'Create Product'} navigation={navigation} back />
        <View style={styles.createProductContainer}>
          {/*<View style={styles.createProductHeaderContainer}>
          <Text style={styles.createProductHeaderText}>Create product</Text>
        </View>*/}
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
                style={styles.inputStyle}
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
                  style={styles.inputStyle}
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
                  style={styles.imageStyle}
                />
              )}
              <TouchableOpacity
                onPress={() => imageAddHandler()}
                style={styles.cameraIconContainer}>
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
              <View style={styles.taggedVariantsContainer}>
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
              <View style={styles.selectedColorContainer}>
                <Text>{colorItem ? colorItem.name : 'Select Color'}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsColorModalVisible(true);
                  }}
                  style={styles.pickColorButton}>
                  <Text style={styles.pickColorButtonText}>Pick</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sizeValuesContainer}>
              {sizeAttributeValues.slice(0, viewableItems).map(value => {
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
            <View style={{alignSelf: 'center', marginVertical: 10}}>
              <Text
                onPress={() => {
                  const newViewableItems = viewableItems + 5;
                  setViewableItems(newViewableItems);
                }}
                style={{
                  color: 'blue',
                }}>
                View More
              </Text>
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
    </SafeAreaView>
  );
};

export default CreateProductScreen;
