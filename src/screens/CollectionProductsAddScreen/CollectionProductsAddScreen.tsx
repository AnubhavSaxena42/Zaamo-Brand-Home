import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';

import AddProductCard from '../../components/AddProductCard/AddProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {setStoreProducts} from '../../redux/reducers/storeReducer';
import {useMutation, useQuery} from '@apollo/client';
import {ADD_PRODUCTS_COLLECTION, COLLECTION_CREATE} from './mutations';
import {setStoreCollections} from '../../redux/reducers/storeReducer';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
import {GET_PRODUCTS_BY_BRAND} from './queries';

const CollectionProductsAddScreen = ({navigation, route, collection}) => {
  const productsStore = useSelector(state => state.store.products);
  const [products, setProducts] = useState([]);
  const collections = useSelector(state => state.store.collections);
  const [brand, setBrand] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [isBrandSelectModalVisible, setIsBrandSelectModalVisible] =
    useState(false);
  const dispatch = useDispatch();
  console.log('Parameters:', route.params);
  console.log('Products:', products);
  const [collectionAddProducts, collectionAddResponse] = useMutation(
    ADD_PRODUCTS_COLLECTION,
    {
      variables: {
        collectionId: route.params.collection.id,
        products: selectedProducts,
      },
    },
  );
  const brandResponse = useQuery(GET_PRODUCTS_BY_BRAND, {
    variables: {
      brands: [brand],
    },
  });
  useEffect(() => {
    if (collectionAddResponse.data) {
      toastService.showToast('Products have been added successfully', true);
      route.params.setSelectedCollection({
        ...route.params.collection,
        products:
          collectionAddResponse.data.collectionAddProducts.collection.products
            .edges,
      });
      const newCollections = collections.map(collection => {
        if (
          collection.id ===
          collectionAddResponse.data.collectionAddProducts.collection.id
        ) {
          return {
            ...collection,
            products:
              collectionAddResponse.data.collectionAddProducts.collection
                .products.edges,
          };
        } else {
          return collection;
        }
      });
      dispatch(setStoreCollections(newCollections));
      navigation.goBack();
    }
  }, [collectionAddResponse.data]);
  useEffect(() => {
    if (collectionAddResponse.loading) dispatch(setLoaderStatus(true));
    if (!collectionAddResponse.loading) dispatch(setLoaderStatus(false));
  }, [collectionAddResponse.loading]);
  useEffect(() => {
    brandResponse.refetch();
  }, [brand]);
  useEffect(() => {
    if (route.params.fromVoucherCreate) {
      if (brandResponse.data) {
        if (
          brandResponse.data.products &&
          brandResponse.data.products.length !== 0
        ) {
          const newProducts = brandResponse.data.products.edges.map(
            ({node}) => {
              return {
                brandName: node.brand ? node.brand.brandName : '',
                id: node.id,
                price: node.pricing.priceRange
                  ? node.pricing.priceRange.start.net.amount
                  : 0,
                name: node.name ? node.name : '',
                thumbnail: node.thumbnail
                  ? node.thumbnail.url
                  : 'https://media-exp1.licdn.com/dms/image/C4E0BAQGymyKm7OE3wg/company-logo_200_200/0/1636442519943?e=2159024400&v=beta&t=19hHu3puobGsregS0-31D-KiANWe3NqrKZESktzQC30',
              };
            },
          );
          console.log(newProducts);
          setProducts(newProducts);
          dispatch(setLoaderStatus(false));
        }
      } else {
        dispatch(setLoaderStatus(false));
      }
    }
  }, [brandResponse.data]);

  console.log('brandResponse:', brandResponse.data);
  useEffect(() => {
    if (!route.params.fromVoucherCreate && !route.params.collection) {
      setProducts(productsStore);
    }
    if (route.params.collection) {
      const excludeIds = route.params.collection.products.map(
        ({node}) => node.id,
      );
      const newProducts = productsStore.filter(product => {
        const productIncluded = excludeIds.some(id => id === product.id);
        return !productIncluded;
      });
      setProducts(newProducts);
    }
  }, []);

  const ModalItem = ({name, value, selectedItem, setSelectedItem}) => {
    const onPressHandler = () => {
      if (selectedItem === value) {
        return;
      } else {
        dispatch(setLoaderStatus(true));
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

  const [collectionCreate, {data, error, loading}] = useMutation(
    COLLECTION_CREATE,
    {
      variables: {
        name: route.params.collectionName,
        imageUrl: route.params.collectionThumbnail,
        products: selectedProducts,
      },
    },
  );
  useEffect(() => {
    if (route.params.fromVoucherCreate) {
      setSelectedProducts(route.params.products);
    }
  }, []);

  useEffect(() => {
    if (data) {
      console.log('Data:', data);
      if (data.collectionCreate.collection) {
        dispatch(setLoaderStatus(true));
        const newCollections = [
          ...collections,
          data.collectionCreate.collection,
        ];
        console.log('Old collections:', collections);
        console.log('New Collections:', newCollections);
        dispatch(setStoreCollections(newCollections));
        dispatch(setLoaderStatus(false));
        toastService.showToast(
          `Collection Created:${data.collectionCreate.collection.name}`,
          true,
        );
        navigation.navigate('ProductsTabScreen');
      } else {
        console.log('error');
        dispatch(setLoaderStatus(false));
        toastService.showToast('Could not create collection,Try Again', true);
        navigation.navigate('ProductsTabScreen');
      }
    }
  }, [data]);
  const onPressComplete = () => {
    if (route.params.fromVoucherCreate) {
      route.params.setProducts(selectedProducts);
      navigation.goBack();
    } else if (route.params.collection) {
      collectionAddProducts();
    } else {
      collectionCreate();
    }
  };
  console.log(selectedProducts);
  return (
    <View style={styles.collectionProductsAddScreenContainer}>
      <Modal visible={isBrandSelectModalVisible} transparent={true}>
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
              Select Brand
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
              data={route.params.brands}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <ModalItem
                  name={item.name}
                  value={item.id}
                  selectedItem={brand}
                  setSelectedItem={setBrand}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => {
                setIsBrandSelectModalVisible(false);
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
      <View
        style={{
          width: '100%',
          height: '10%',
          flexDirection: 'row',
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0,0,0,0.2)',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: '4%',
        }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            flex: 5,
            fontWeight: '500',
            color: 'black',
          }}>
          Products
        </Text>
        <TouchableOpacity
          onPress={onPressComplete}
          style={{
            flex: 1,
            backgroundColor: 'black',
            paddingHorizontal: '5%',
            paddingVertical: '5%',
            width: '50%',
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            {route.params.fromVoucherCreate ? 'Add Products' : 'Create'}
          </Text>
        </TouchableOpacity>
      </View>
      {route.params.fromVoucherCreate && (
        <View
          style={{
            width: '100%',
            height: 80,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setIsBrandSelectModalVisible(true)}
            style={{
              borderColor: 'rgba(0,0,0,0.5)',
              borderWidth: 1,
              height: 50,
              width: 300,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowRadius: 2,
              shadowOpacity: 1.0,
            }}>
            <Text>Select Brand</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}>
        {products.map(product => (
          <AddProductCard
            key={product.id}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            product={product}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CollectionProductsAddScreen;

const styles = StyleSheet.create({
  collectionProductsAddScreenContainer: {
    flex: 1,
  },
});
