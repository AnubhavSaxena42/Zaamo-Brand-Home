import React, {useState, useMemo, useEffect} from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {tailwind} from '../../core/tailwind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddProductCard from '../../components/AddProductCard/AddProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation, NetworkStatus, useQuery} from '@apollo/client';
import {ADD_PRODUCTS_COLLECTION, COLLECTION_CREATE} from '../../api/mutations';
import {setStoreCollections} from '../../redux/reducers/storeReducer';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import {getItemFromStorage} from '../../services/storage-service';
import toastService from '../../services/toast-service';
import {
  GET_COLLECTION_BY_ID,
  GET_PRODUCTS_BY_BRAND,
  GET_AUTHORISED_BRANDS,
  GET_STORE,
} from '../../api/queries';
import {styles} from './styles';
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
  const storeID = useSelector(state => state.store.storeInfo.id);
  console.log('Store ID:::', storeID);
  const storeProductsResponse = useQuery(GET_AUTHORISED_BRANDS, {
    variables: {
      mobileNo: '91' + mobileNumber,
      endCursor: '',
      stores: [storeID],
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!route.params.fromVoucherCreate) {
      if (storeProductsResponse.data) {
        if (
          storeProductsResponse.data.userByMobile &&
          storeProductsResponse.data.userByMobile.authorisedBrands[0] &&
          storeProductsResponse.data.userByMobile.authorisedBrands[0].products
        ) {
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
                  collections: node.collections,
                  thumbnail: node.thumbnail
                    ? node.thumbnail.url
                    : 'https://media-exp1.licdn.com/dms/image/C4E0BAQGymyKm7OE3wg/company-logo_200_200/0/1636442519943?e=2159024400&v=beta&t=19hHu3puobGsregS0-31D-KiANWe3NqrKZESktzQC30',
                  price: node.pricing.priceRange
                    ? node.pricing.priceRange.start.net.amount
                    : 0,
                };
              },
            );

          if (route.params.collection) {
            const filteredProducts = newStoreProducts.filter(product => {
              const productIncluded = product.collections.some(collection => {
                return collection.id === route.params.collection.id;
              });
              return !productIncluded;
            });
            setProducts(filteredProducts);
            /*let newProducts = newStoreProducts.filter(product => {
              const productIncluded = excludeIds.some(id => id === product.id);
              if (productIncluded)
                console.log('Product Excluded:', product.name);
              return !productIncluded;
            });
            newProducts = [
              ...newProducts,
              ...products.filter(product => {
                const productIncluded = excludeIds.some(
                  id => id === product.id,
                );
                return !productIncluded;
              }),
            ];

            setProducts(newProducts);*/
          } else setProducts(newStoreProducts);
        }
      }
    }
  }, [storeProductsResponse.data]);

  useEffect(() => {
    if (collectionAddResponse.data) {
      toastService.showToast('Products have been added successfully', false);
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
                slug: node.slug,
                images: node.images,

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
      refetchQueries: [GET_STORE],
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
      console.log('In wrong case');
      if (selectedProducts.length === 0) navigation.goBack();
      else collectionAddProducts();
    } else {
      console.log('checkObj', {
        name: route.params.collectionName,
        imageUrl: route.params.collectionThumbnail,
        products: selectedProducts,
      });
      collectionCreate();
    }
  };
  console.log('select:', selectedProducts);
  const _renderProduct = ({item}) => (
    <AddProductCard
      navigation={navigation}
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
            <BarIndicator size={30} count={5} color="black" />
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
            <BarIndicator size={30} count={5} color="black" />
          </View>
        );
      } else {
        return null;
      }
    }
  };
  return (
    <SafeAreaView style={styles.collectionProductsAddScreenContainer}>
      <Modal
        onRequestClose={() => setIsBrandSelectModalVisible(false)}
        visible={isBrandSelectModalVisible}
        transparent={true}>
        <View style={styles.brandSelectModalContainer}>
          <View style={styles.brandSelectModalSubContainer}>
            <Text style={styles.selectBrandHeaderText}>Select Brand</Text>
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
              style={styles.selectBrandModalConfirmButton}>
              <Text style={styles.selectBrandModalConfirmButtonText}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View>
            <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Products</Text>
        </View>
        <Pressable onPress={onPressComplete} style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>
            {route.params.fromVoucherCreate ? 'Add Products' : 'Confirm'}
          </Text>
        </Pressable>
      </View>
      {route.params.fromVoucherCreate && (
        <View style={styles.selectBrandButtonContainer}>
          <TouchableOpacity
            onPress={() => setIsBrandSelectModalVisible(true)}
            style={styles.selectBrandButton}>
            <Text style={styles.selectBrandButtonText}>Select Brand</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={products}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
        onRefresh={
          route.params.fromVoucherCreate
            ? brandResponse.refetch
            : storeProductsResponse.refetch
        }
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: products.length === 0 ? 'center' : 'flex-start',
        }}
        refreshing={refreshing}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !brandResponse.loading && !storeProductsResponse.loading
            ? () => (
                <View
                  style={[
                    tailwind(
                      'bg-white mt-1 mx-10   rounded border border-gray-400 flex-row items-center justify-center',
                    ),
                    {},
                  ]}>
                  <AntDesign name="tags" size={40} color="black" />
                  <Text
                    style={tailwind(
                      'text-sm font-semibold text-center px-6 py-5 text-gray-600 ',
                    )}>
                    No Products Found
                  </Text>
                </View>
              )
            : null
        }
        ListFooterComponent={ListFooterComponent}
        keyExtractor={item => item.id}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        renderItem={_renderProduct}
      />
    </SafeAreaView>
  );
};

export default CollectionProductsAddScreen;
