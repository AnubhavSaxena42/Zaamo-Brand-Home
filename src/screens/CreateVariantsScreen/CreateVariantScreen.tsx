// @ts-nocheck
import {useMutation} from '@apollo/client';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
//import GestureRecognizer from 'react-native-swipe-gestures';
import Header from '../../components/Header';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
import {GET_AUTHORISED_BRANDS} from '../DashboardScreen/queries';
import {CREATE_VARIANTS} from './mutations';
const VariantRow = ({variant}) => {
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  return (
    <View style={styles.variantRowContainer}>
      <View style={styles.variantNameContainer}>
        <Text style={styles.variantNameText}>{variant.name}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={stock}
          onChangeText={text => {
            setStock(text);
            variant.stock = text;
          }}
          keyboardType={'number-pad'}
          placeholder="Enter Stock here"
          style={styles.stockInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={price}
          onChangeText={text => {
            setPrice(text);
            variant.price = text;
          }}
          keyboardType={'number-pad'}
          placeholder="Enter Price here"
          style={styles.priceInput}
        />
      </View>
    </View>
  );
};
const ErrorMessage = ({message}) => {
  return (
    <View style={styles.errorMessageContainer}>
      <Text style={styles.errorMessageText}>
        {message ? message : 'This Field is required*'}
      </Text>
    </View>
  );
};
const CreateVariantScreen = ({navigation, route}) => {
  const {variations, productID} = route.params;
  console.log('Variations:', variations);
  const [variants, setVariants] = useState();
  console.log(productID);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [productVariantBulkCreate, variantCreateResponse] = useMutation(
    CREATE_VARIANTS,
    {
      variables: {
        product: productID,
        variants: variants,
      },
      refetchQueries: [GET_AUTHORISED_BRANDS],
    },
  );
  const warehouseId = useSelector(state => state.store.warehouse);
  console.log(variations);
  const onVariantsCreate = () => {
    let flag = 0;
    const newVariants = variations.map(variant => {
      if (!variant.stock || variant.stock === '') flag++;
      if (!variant.price || variant.price === '') flag++;
      return {
        attributes: variant.attributes,
        stocks: [{warehouse: warehouseId, quantity: parseInt(variant.stock)}],
        price: parseInt(variant.price),
        sku:
          variant.name +
          variant.attributes[0].id +
          variant.attributes[0].values[0] +
          new Date().toISOString(),
        trackInventory: true,
      };
    });
    if (flag > 0) {
      setError(true);
      return;
    }
    setVariants(newVariants);
  };

  useEffect(() => {
    if (variants) productVariantBulkCreate();
  }, [variants]);
  useEffect(() => {
    if (variantCreateResponse.data) {
      console.log(variantCreateResponse.data);
      if (
        variantCreateResponse.data.productVariantBulkCreate.count > 0 &&
        variantCreateResponse.data.productVariantBulkCreate.count > 0
      ) {
        toastService.showToast('Variants Created Successfully', true);
        navigation.replace('ProductsTabScreen');
      }
    }
  }, [variantCreateResponse.data]);
  useEffect(() => {
    if (variantCreateResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [variantCreateResponse.loading]);
  return (
    <ScrollView style={styles.variantContainer}>
      {/*<GestureRecognizer
        config={{directionalOffsetThreshold: 30, velocityThreshold: 0.5}}
        onSwipeRight={() => navigation.goBack()}>*/}
      <Header />
      <View style={styles.variantHeaderContainer}>
        <View style={styles.variantNameHeader}>
          <Text style={styles.headerText}>Variants</Text>
        </View>
        <View style={styles.variantStockHeader}>
          <Text style={styles.headerText}>Stock</Text>
        </View>
        <View style={styles.variantPriceHeader}>
          <Text style={styles.headerText}>Price</Text>
        </View>
      </View>
      <View>
        {variations.map(variation => (
          <VariantRow variant={variation} />
        ))}
      </View>
      {error && <ErrorMessage message="Please fill all the information" />}
      <TouchableOpacity onPress={onVariantsCreate}>
        <View style={styles.confirmButtonContainer}>
          <View style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/*</GestureRecognizer>*/}
    </ScrollView>
  );
};

export default CreateVariantScreen;

const styles = StyleSheet.create({
  variantContainer: {
    backgroundColor: '#f8f8f8',
  },
  variantHeaderContainer: {
    flexDirection: 'row',
    marginVertical: '5%',
  },
  variantNameContainer: {
    backgroundColor: 'white',
    width: '31%',
    height: '100%',
    borderColor: 'black',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
  variantNameHeader: {
    width: '33%',
  },
  variantStockHeader: {
    width: '33%',
  },
  variantPriceHeader: {
    width: '33%',
  },
  variantRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '1%',
    height: 90,
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    width: '31%',
    height: '100%',
    textAlign: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceInput: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  stockInput: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  variantNameText: {
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
    fontWeight: '700',
  },
  errorMessageContainer: {
    marginTop: '1%',
    alignSelf: 'center',
  },
  errorMessageText: {
    fontSize: 12,
    color: 'red',
  },
  confirmButtonContainer: {
    marginVertical: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: 'black',
    width: '50%',
    padding: '3%',
    borderRadius: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
});
