import React, {useState, useEffect} from 'react';
import {useMutation, useQuery, NetworkStatus} from '@apollo/client';
import tailwind from 'tailwind-rn';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from 'react-native';
import ProductCard from '../../components/ProductCard/ProductCard';
import {BarIndicator} from 'react-native-indicators';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {REMOVE_PRODUCT_COLLECTION} from './mutations';
import {useDispatch, useSelector} from 'react-redux';
import {setStoreCollections} from '../../redux/reducers/storeReducer';
import toastService from '../../services/toast-service';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import {GET_STORE} from '../DashboardScreen/queries';
import {GET_COLLECTION_BY_ID} from './queries';
const CollectionViewScreen = ({navigation, route}) => {
  const {collection} = route.params;
  const [selectedCollection, setSelectedCollection] = useState();
  const currentCollections = useSelector(state => state.store.collections);
  const [productIdToRemove, setProductIdToRemove] = useState('');
  const dispatch = useDispatch();
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [productsPageInfo, setProductsPageInfo] = useState({
    hasNextPage: true,
    endCursor: '',
  });

  const [collectionRemoveProducts, productRemoveResponse] = useMutation(
    REMOVE_PRODUCT_COLLECTION,
    {
      variables: {
        collectionId: collection.id,
        products: [productIdToRemove],
      },
      refetchQueries: [GET_STORE, GET_COLLECTION_BY_ID],
    },
  );
  const collectionResponse = useQuery(GET_COLLECTION_BY_ID, {
    variables: {
      id: collection.id,
      endCursor: '',
    },
    notifyOnNetworkStatusChange: true,
  });
  const refreshing = collectionResponse.networkStatus === NetworkStatus.refetch;
  console.log('Products:', collectionProducts);
  console.log('Page info:', productsPageInfo);
  useEffect(() => {
    if (collectionResponse.data) {
      console.log(collectionResponse.data);
      const newCollectionProducts =
        collectionResponse.data.collection.products.edges.map(({node}) => {
          return {
            brandName: node.brand.brandName,
            id: node.id,
            name: node.name,
            images: node.images,
            thumbnail: node.thumbnail
              ? node.thumbnail.url
              : 'https://media-exp1.licdn.com/dms/image/C4E0BAQGymyKm7OE3wg/company-logo_200_200/0/1636442519943?e=2159024400&v=beta&t=19hHu3puobGsregS0-31D-KiANWe3NqrKZESktzQC30',
            price: node.pricing.priceRange
              ? node.pricing.priceRange.start.net.amount
              : 0,
          };
        });
      setCollectionProducts(newCollectionProducts);
      setProductsPageInfo(collectionResponse.data.collection.products.pageInfo);
    }
  }, [collectionResponse.data]);
  useEffect(() => {
    if (productRemoveResponse.data) {
      console.log('Current Collections:', currentCollections);
      const newCollections = currentCollections.map(collection => {
        if (
          collection.id ===
          productRemoveResponse.data.collectionRemoveProducts.collection.id
        ) {
          return {
            ...collection,
            products:
              productRemoveResponse.data.collectionRemoveProducts.collection
                .products.edges,
          };
        } else {
          return collection;
        }
      });
      console.log('New Collections:', newCollections);
      dispatch(setStoreCollections(newCollections));
      setSelectedCollection({
        ...collection,
        products:
          productRemoveResponse.data.collectionRemoveProducts.collection
            .products.edges,
      });
      toastService.showToast(
        'Product has been removed from the collection',
        false,
      );
    }
  }, [productRemoveResponse.data]);
  useEffect(() => {
    if (productRemoveResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [productRemoveResponse.loading]);
  useEffect(() => {
    if (productIdToRemove && productIdToRemove !== '') {
      collectionRemoveProducts();
    }
  }, [productIdToRemove]);
  useEffect(() => {
    setSelectedCollection(collection);
  }, []);

  const handleOnEndReached = () => {
    console.log('Next Page:', productsPageInfo.hasNextPage);

    if (productsPageInfo.hasNextPage && !collectionResponse.loading) {
      console.log('FetchingMoreProducts');
      return collectionResponse.fetchMore({
        variables: {
          id: collection.id,
          endCursor: productsPageInfo.endCursor,
        },
      });
    }
  };
  const _renderProduct = ({item}) => (
    <ProductCard
      navigation={navigation}
      inCollectionView={true}
      product={item}
      setProductIdToRemove={setProductIdToRemove}
    />
  );
  return (
    <SafeAreaView style={styles.collectionViewContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 60,
          justifyContent: 'center',
          backgroundColor: 'black',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0,0,0,0.2)',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{zIndex: 2, position: 'absolute', left: 10}}>
          <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            color: 'white',
            fontFamily: 'Roboto-Bold',
          }}>
          {collection.name}
        </Text>
      </View>
      <FlatList
        data={collectionProducts}
        onEndReached={handleOnEndReached}
        onEndReachedThreshold={0.5}
        onRefresh={collectionResponse.refetch}
        refreshing={refreshing}
        numColumns={2}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent:
            collectionProducts.length === 0 ? 'center' : 'flex-start',
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !refreshing && !collectionResponse.loading
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
        ListFooterComponent={
          collectionResponse.loading
            ? () => {
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
              }
            : null
        }
        keyExtractor={item => item.id}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        renderItem={_renderProduct}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CollectionProductsAddScreen', {
            collection: collection,
            setSelectedCollection: setSelectedCollection,
          });
        }}
        style={{
          alignSelf: 'center',
          width: '80%',
          backgroundColor: 'black',
          borderRadius: 10,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: '2%',
        }}>
        <Text style={{color: 'white'}}>Add Products</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CollectionViewScreen;

const styles = StyleSheet.create({
  collectionViewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageStyle: {
    width: '100%',
    height: 150,
  },
});
