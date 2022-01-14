import React, {useState, useMemo, useEffect} from 'react';
import {
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddProductCard from '../../components/AddProductCard/AddProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {setStoreProducts} from '../../redux/reducers/storeReducer';
import {useMutation, NetworkStatus, useQuery} from '@apollo/client';
import {ADD_PRODUCTS_COLLECTION, COLLECTION_CREATE} from './mutations';
import {setStoreCollections} from '../../redux/reducers/storeReducer';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
import {GET_PRODUCTS_BY_BRAND} from './queries';
import {GET_AUTHORISED_BRANDS, GET_STORE} from '../DashboardScreen/queries';
import {GET_COLLECTION_BY_ID} from '../CollectionViewScreen/queries';
const CollectionProductsAddScreen = ({navigation, route, collection}) => {
  const productsStore = useSelector(state => state.store.products);
  const collections = useSelector(state => state.store.collections);
  const mobileNumber = useSelector(state => state.user.mobileNumber);
  const [products, setProducts] = useState([]);
  const [productsPageInfo, setProductsPageInfo] = useState({
    hasNextPage: true,
    endCursor: '',
  });
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
        collectionId: route.params.collection ? route.params.collection.id : '',
        products: selectedProducts,
      },
      refetchQueries: [GET_STORE, GET_COLLECTION_BY_ID],
    },
  );
  const brandResponse = useQuery(GET_PRODUCTS_BY_BRAND, {
    variables: {
      brands: [brand],
      endCursor: '',
    },
    notifyOnNetworkStatusChange: true,
  });
  const storeProductsResponse = useQuery(GET_AUTHORISED_BRANDS, {
    variables: {
      mobileNo: '91' + mobileNumber,
      endCursor: '',
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    console.log('running');
    if (!route.params.fromVoucherCreate) {
      if (storeProductsResponse.data) {
        if (
          storeProductsResponse.data.userByMobile &&
          storeProductsResponse.data.userByMobile.authorisedBrands[0] &&
          storeProductsResponse.data.userByMobile.authorisedBrands[0].products
        ) {
          console.log('Here');
          console.log(storeProductsResponse.data);
          const {hasNextPage, endCursor} =
            storeProductsResponse.data.userByMobile.authorisedBrands[0].products
              .pageInfo;
          setProductsPageInfo({
            hasNextPage,
            endCursor,
          });
          const newStoreProducts =
            storeProductsResponse.data.userByMobile.authorisedBrands[0].products.edges.map(
              ({node}) => {
                return {
                  brandName: node.brand.brandName,
                  id: node.id,
                  name: node.name,
                  url: node.url,
                  images: node.images,
                  thumbnail: node.thumbnail
                    ? node.thumbnail.url
                    : 'https://media-exp1.licdn.com/dms/image/C4E0BAQGymyKm7OE3wg/company-logo_200_200/0/1636442519943?e=2159024400&v=beta&t=19hHu3puobGsregS0-31D-KiANWe3NqrKZESktzQC30',
                  price: node.pricing.priceRange
                    ? node.pricing.priceRange.start.net.amount
                    : 0,
                };
              },
            );
          console.log('New Store Products:', newStoreProducts.length);
          /*if (route.params.collection) {
          console.log('in collection case');
          const excludeIds = route.params.collection.products.map(
            ({node}) => node.id,
          );
          console.log('Ids to exclude:', excludeIds);
          let newProducts = newStoreProducts.filter(product => {
            const productIncluded = excludeIds.some(id => id === product.id);
            return !productIncluded;
          });
          newProducts = [
            ...newProducts,
            ...products.filter(product => {
              const productIncluded = excludeIds.some(id => id === product.id);
              return !productIncluded;
            }),
          ];
          console.log('filtered Products:', newProducts);
          setProducts(newProducts);
        }*/
          setProducts(newStoreProducts);
        }
      }
    }
  }, [storeProductsResponse.data]);

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
      storeProductsResponse.refetch();
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
          const {hasNextPage, endCursor} = brandResponse.data.products.pageInfo;
          setProductsPageInfo({
            hasNextPage,
            endCursor,
          });
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
        }
      }
    }
  }, [brandResponse.data]);
  /* useEffect(() => {
    if (brandResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [brandResponse.loading]);
*/
  console.log('brandResponse:', brandResponse.data);
  /*
  useEffect(() => {
    dispatch(setLoaderStatus(true));
    if (!route.params.fromVoucherCreate && !route.params.collection) {
      setProducts([]);
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
    dispatch(setLoaderStatus(false));
  }, []);
*/
  const ModalItem = ({name, value, selectedItem, setSelectedItem}) => {
    const onPressHandler = () => {
      if (selectedItem === value) {
        return;
      } else {
        dispatch(setLoaderStatus(true));
        setTimeout(() => dispatch(setLoaderStatus(false)), 3000);
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
          paddingVertical: '2%',
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
    if (loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [loading]);
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
        console.log('Collection Create:', data.collectionCreate.collection);
        const newCollection = {
          id: data.collectionCreate.collection.id,
          products: data.collectionCreate.collection.products
            ? data.collectionCreate.collection.products.edges
            : [],
          imageUrl: data.collectionCreate.collection.imageUrl
            ? data.collectionCreate.collection.imageUrl
            : '',
          name: data.collectionCreate.collection.name
            ? data.collectionCreate.collection.name
            : '',
        };
        const newCollections = [...collections, newCollection];
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
      if (selectedProducts.length === 0) navigation.goBack();
      else collectionAddProducts();
    } else {
      collectionCreate();
    }
  };
  console.log('select:', selectedProducts);
  const _renderProduct = ({item}) => (
    <AddProductCard
      selectedProducts={selectedProducts}
      setSelectedProducts={setSelectedProducts}
      product={item}
    />
  );
  const refreshing =
    storeProductsResponse.networkStatus === NetworkStatus.refetch;
  const handleOnEndReached = () => {
    console.log('Next Page:', productsPageInfo.hasNextPage);
    if (productsPageInfo.hasNextPage && !storeProductsResponse.loading) {
      console.log('FetchingMoreProducts');
      if (!route.params.fromVoucherCreate) {
        return storeProductsResponse.fetchMore({
          variables: {
            mobileNo: '91' + mobileNumber,
            endCursor: productsPageInfo.endCursor,
          },
        });
      } else {
        return brandResponse.fetchMore({
          variables: {
            endCursor: productsPageInfo.endCursor,
          },
        });
      }
    }
  };
  const ListFooterComponent = () => {
    if (route.params.fromVoucherCreate) {
      if (brandResponse.loading) {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color="black" />
          </View>
        );
      } else return null;
    } else {
      if (storeProductsResponse.loading) {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color="black" />
          </View>
        );
      } else {
        return null;
      }
    }
  };
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
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: '4%',
          paddingHorizontal: '2%',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" color={'black'} size={35} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Roboto-Bold',
            color: 'black',
          }}>
          Products
        </Text>
        <TouchableNativeFeedback
          onPress={onPressComplete}
          style={{
            backgroundColor: 'black',
            paddingHorizontal: '5%',
            paddingVertical: '5%',
          }}>
          <Text
            style={{
              color: 'black',
            }}>
            {route.params.fromVoucherCreate ? 'Add Products' : 'Confirm'}
          </Text>
        </TouchableNativeFeedback>
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
      {/*<ScrollView
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
      </ScrollView>*/}
      <FlatList
        data={products}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
        onRefresh={
          route.params.fromVoucherCreate
            ? brandResponse.refetch
            : storeProductsResponse.refetch
        }
        refreshing={refreshing}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color="black" />
          </View>
        )}
        ListFooterComponent={ListFooterComponent}
        keyExtractor={item => item.id}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        renderItem={_renderProduct}
      />
    </View>
  );
};

export default CollectionProductsAddScreen;

const styles = StyleSheet.create({
  collectionProductsAddScreenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
