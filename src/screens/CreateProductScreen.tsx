// @ts-nocheck
import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  View,
  Platform,
} from 'react-native';
import Header from '../components/Header';
import Dropdown from '../components/Dropdown';
import Checkbox from '../components/Checkbox';
import {useQuery} from '@apollo/client';
import {GET_CATEGORIES} from './queries';
import TaggedComponent from '../components/TaggedComponent';
//import GestureRecognizer from 'react-native-swipe-gestures';
const ErrorMessage = () => {
  return (
    <View style={styles.errorMessageContainer}>
      <Text style={styles.errorMessageText}>This Field is required*</Text>
    </View>
  );
};
const CreateProductScreen = ({navigation}) => {
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
  const [isVariationNameError, setIsVariationNameError] = useState(false);
  const [trigger, setTrigger] = useState(true);
  const [codCheckbox, setCodCheckbox] = useState([
    {value: 'Allow COD', isSelected: false},
  ]);
  const [variationCheckboxes, setVariationCheckboxes] = useState([
    {value: 'XS', isSelected: false},
    {value: 'S', isSelected: false},
    {value: 'M', isSelected: false},
    {value: 'L', isSelected: false},
    {value: 'XL', isSelected: false},
    {value: 'XXL', isSelected: false},
  ]);
  const [variations, setVariations] = useState([
    'Jute,XS',
    'Jute,M',
    'Jute,XL',
    'Red,XS',
    'Red,M',
    'Red,XL',
  ]);
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

  const {error, loading, data} = useQuery(GET_CATEGORIES);
  console.log(error, loading, data);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{backgroundColor: 'rgba(229, 229, 229, 0.2);'}}>
      {/*<GestureRecognizer
        config={{directionalOffsetThreshold: 30, velocityThreshold: 0.5}}
        onSwipeRight={() => navigation.goBack()}>*/}
      <Header navigation={navigation} showBackButton={true} />
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
          <View style={styles.productImagesContainer}>
            {/* product Images + add Image */}
          </View>
          <View style={styles.productPriceStockInputContainer}>
            <View style={styles.priceInputContainer}>
              <Text style={styles.labelText}>Price</Text>
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
            <View style={styles.stockInputContainer}>
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
            </View>
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
          <View style={styles.selectCategoryContainer}>
            <Text style={styles.labelText}>Select Category</Text>
            <Dropdown
              tag="Select Category"
              items={contentFormatItems}
              selectedValue={contentFormat}
              setSelectedValue={setContentFormat}
              dropDownStyle={{zIndex: 600}}
            />
          </View>
          <View style={styles.selectSubCategoryContainer}>
            <Text style={styles.labelText}>Select Sub Category</Text>
            <Dropdown
              tag="Select Sub Category"
              items={contentFormatItems}
              selectedValue={contentFormat}
              setSelectedValue={setContentFormat}
              dropDownStyle={{zIndex: 400}}
            />
          </View>
          <View style={styles.codCheckboxContainer}>
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
          </View>
          <Text style={styles.labelText}>Variations</Text>
          <View style={styles.variationsContainer}>
            {variations.map(item => (
              <View key={item} style={{marginRight: '10%', marginBottom: '2%'}}>
                <TaggedComponent
                  tag={item}
                  variation={true}
                  onDelete={() => {
                    removeVariationHandler(item);
                  }}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={{height: '2%', backgroundColor: 'white'}}></View>

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
        </View>
        <TouchableOpacity onPress={onSubmitHandler}>
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
  createProductContainer: {},
  createProductHeaderContainer: {
    backgroundColor: 'white',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  createProductHeaderText: {
    color: 'black',
    fontSize: Platform.OS === 'web' ? 36 : 28,
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
    fontSize: Platform.OS === 'web' ? 30 : 24,
    fontWeight: '500',
    color: 'black',
    marginTop: '3%',
  },
  productNameInputContainer: {},
  labelText: {
    fontSize: Platform.OS === 'web' ? 24 : 16,
    fontWeight: '400',
    marginTop: '3%',
  },
  productImagesContainer: {},
  productPriceStockInputContainer: {
    flexDirection: Platform.OS === 'web' ? 'column' : 'row',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: Platform.OS === 'web' ? '1%' : '2%',
    backgroundColor: 'white',
    fontSize: Platform.OS === 'web' ? 24 : 14,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: '2%',
    fontSize: Platform.OS === 'web' ? 24 : 14,

    marginRight: '2%',
    backgroundColor: 'white',
  },
  productDescriptionInput: {
    borderWidth: 1,
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: '2%',
    height: 200,
    fontSize: Platform.OS === 'web' ? 24 : 14,
    paddingHorizontal: '1%',
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  stockInput: {
    borderWidth: 1,
    borderColor: '#b7b9ba',
    borderRadius: 5,
    marginTop: '2%',
    fontSize: Platform.OS === 'web' ? 24 : 14,
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
    width: Platform.OS === 'web' ? '120%' : '35%',
    padding: Platform.OS === 'web' ? '15%' : '3%',
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
