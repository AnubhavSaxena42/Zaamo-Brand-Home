// @ts-nocheck
import {useMutation, useLazyQuery, useQuery} from '@apollo/client';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
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
import {GET_AUTHORISED_BRANDS, GET_PRODUCT} from '../../api/queries';
import {
  CREATE_VARIANTS,
  BULK_UPDATE_VARIANT_INVENTORY,
} from '../../api/mutations';
const VariantRow = ({variant, edit}) => {
  const [stock, setStock] = useState(
    edit ? variant.stocks[0].quantity.toString() : '',
  );
  const [price, setPrice] = useState(
    edit ? variant.price.amount.toString() : '',
  );
  const [costPrice, setCostPrice] = useState(
    edit ? variant.costPrice?.amount.toString() : '',
  );
  console.log('Edit Variant:', variant);

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
            if (edit) variant.stocks[0].quantity = parseInt(text);
            else variant.stock = text;
          }}
          keyboardType={'number-pad'}
          placeholder="Enter Stock"
          style={styles.stockInput}
        />
      </View>
      <View style={styles.inputContainer}>
        {/*<TextInput
          value={price}
          onChangeText={text => {
            //setPrice(text);
            //if (edit) variant.price.amount = parseInt(text);
            //else variant.price = parseInt(text);
          }}
          keyboardType={'number-pad'}
          placeholder="Enter Price"
          style={styles.priceInput}
        />*/}
        <Text style={{...styles.priceInput, color: 'gray'}}>{price}</Text>
      </View>
      <View style={styles.inputContainer}>
        {/*<TextInput
          value={costPrice}
          onChangeText={text => {
            //setCostPrice(text);
            //if (edit) variant.costPrice.amount = parseInt(text);
            //else variant.costPrice = parseInt(text);
          }}
          keyboardType={'number-pad'}
          placeholder="Enter Cost"
          style={styles.priceInput}
        />*/}
        <Text style={{...styles.priceInput, color: 'gray'}}>{costPrice}</Text>
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
  const {
    variations,
    editInventory,
    editVariants,
    products,
    setProducts,
    productID,
    product,
  } = route.params;
  const [newProduct, setNewProduct] = useState(false);
  const [variants, setVariants] = useState();
  const storeID = useSelector(state => state.store.storeInfo.id);
  console.log(storeID);
  console.log('Variants:', JSON.stringify(variants));
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [getProduct, productResponse] = useLazyQuery(GET_PRODUCT, {
    variables: {
      productId: product?.id,
      stores: [storeID],
    },
  });
  useEffect(() => {
    if (productResponse.data) {
      const newProducts = products.map(item => {
        if (item.id === productResponse.data.product.id) {
          console.log('New Product::::', productResponse.data.product);
          const node = productResponse.data.product;
          return {
            brandName: node.brand.brandName,
            id: node.id,
            name: node.name,
            url: node.url,
            slug: node.slug,
            description: JSON.parse(node?.descriptionJson)?.description_text,
            images: node.images,
            variants: node.variants,
            thumbnail: node.thumbnail
              ? node.thumbnail.url
              : 'https://media-exp1.licdn.com/dms/image/C4E0BAQGymyKm7OE3wg/company-logo_200_200/0/1636442519943?e=2159024400&v=beta&t=19hHu3puobGsregS0-31D-KiANWe3NqrKZESktzQC30',
            price: node.pricing.priceRange
              ? node.pricing.priceRange.start.net.amount
              : 0,
            priceUndiscounted:
              node.pricing.priceRangeUndiscounted?.start?.net?.amount,
          };
        } else return item;
      });
      setProducts(newProducts);
      if (!newProduct) {
        setNewProduct(true);
        navigation.goBack();
      }
    }
  }, [productResponse.data]);
  const [bulkUpdateVariants, variantsUpdateResponse] = useMutation(
    BULK_UPDATE_VARIANT_INVENTORY,
    {
      variables: {
        input: [],
      },
      refetchQueries: [],
    },
  );
  useEffect(() => {
    if (variantsUpdateResponse.data) {
      console.log(variantsUpdateResponse.data);
      if (variantsUpdateResponse.data.variantInventoryUpdate?.success) {
        toastService.showToast(
          'Variants have been successfully updated!',
          true,
        );
        getProduct({
          variables: {
            productId: product?.id,
            stores: [storeID],
          },
        });
      } else {
        toastService.showToast(
          'Failed to update Variants,please try again later!',
          true,
        );
      }
    }
  }, [variantsUpdateResponse.data]);
  useEffect(() => {
    if (variantsUpdateResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [variantsUpdateResponse.loading]);
  const [productVariantBulkCreate, variantCreateResponse] = useMutation(
    CREATE_VARIANTS,
    {
      variables: {
        product: productID,
        variants: variants,
      },
      refetchQueries: [GET_AUTHORISED_BRANDS],
      notifyOnNetworkStatusChange: true,
    },
  );
  const warehouseId = useSelector(state => state.store.warehouse);
  console.log(variations);
  console.log('Hi', {
    editVariants,
    products,
    productID,
    setProducts,
    product,
  });
  const onVariantsUpdate = () => {
    console.log('Edit Variants:', editVariants);
    /*const newProducts = products.map(item => {
      if (item.id === product.id) {
        console.log('New Product:', {
          ...item,
          variants: editVariants,
        });
        return {
          ...item,
          variants: editVariants,
        };
      } else return item;
    });
    setProducts(newProducts);*/
    let flag = false;
    let error = '';

    editVariants.forEach(variant => {
      if (!variant.stocks[0].quantity || variant.stocks[0].quantity === '') {
        error = 'Stock Values can not be empty!';
        flag++;
      }
      if (!variant.price.amount || variant.price.amount === '') {
        error = 'Price Values can not be empty!';
        flag++;
      }
      if (variant.stocks[0].quantity > 50) {
        flag++;
        error = 'Stock Values can not exceed the limit of 50';
      }
      if (!variant.costPrice.amount || variant.costPrice.amount === '') {
        error = 'Price Values can not be empty!';
        flag++;
      }
    });
    if (flag) {
      toastService.showToast(error, true);
      return;
    }
    const updateVariantInput = editVariants.map(variant => {
      return {
        variantId: variant.id,
        stock: variant.stocks[0].quantity,
        sellingPrice: variant.price.amount,
        costPrice: variant.costPrice.amount,
      };
    });
    bulkUpdateVariants({
      variables: {
        input: updateVariantInput,
      },
    });
  };
  const onVariantsCreate = () => {
    let flag = 0;
    const newVariants = variations.map(variant => {
      if (!variant.stock || variant.stock === '') flag++;
      if (!variant.price || variant.price === '') flag++;
      if (!variant.costPrice || variant.costPrice === '') flag++;
      return {
        attributes: variant.attributes,
        stocks: [{warehouse: warehouseId, quantity: parseInt(variant.stock)}],
        price: variant.price,
        costPrice: variant.costPrice,
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
      } else {
        toastService.showToast('Failed to create Variants', true);
      }
    }
  }, [variantCreateResponse.data]);

  useEffect(() => {
    if (variantCreateResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [variantCreateResponse.loading]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.variantContainer}>
        {/*<GestureRecognizer
        config={{directionalOffsetThreshold: 30, velocityThreshold: 0.5}}
        onSwipeRight={() => navigation.goBack()}>*/}
        <Header back={editInventory} navigation={navigation} />
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
          <View style={styles.variantPriceHeader}>
            <Text style={styles.headerText}>Cost Price</Text>
          </View>
        </View>
        <View>
          {!editInventory &&
            variations.map(variation => (
              <VariantRow variant={variation} edit={false} />
            ))}
          {editInventory &&
            editVariants.map(variant => (
              <VariantRow variant={variant} edit={true} />
            ))}
        </View>
        {error && <ErrorMessage message="Please fill all the information" />}
        <TouchableOpacity
          onPress={editInventory ? onVariantsUpdate : onVariantsCreate}>
          <View style={styles.confirmButtonContainer}>
            <View style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </View>
          </View>
        </TouchableOpacity>
        {/*</GestureRecognizer>*/}
      </ScrollView>
    </SafeAreaView>
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
    width: '31%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variantStockHeader: {
    width: '23%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variantPriceHeader: {
    width: '23%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variantRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '2%',
    marginVertical: '1%',
    height: 100,
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    width: '25%',
    height: '100%',
    textAlign: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
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
    fontSize: 18,
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
