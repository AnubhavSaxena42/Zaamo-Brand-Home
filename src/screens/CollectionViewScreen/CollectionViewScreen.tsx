import React, {useState, useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {StyleSheet, ScrollView, Text, Image, View} from 'react-native';
import ProductCard from '../../components/ProductCard/ProductCard';
import {REMOVE_PRODUCT_COLLECTION} from './mutations';
import {useDispatch, useSelector} from 'react-redux';
import {setStoreCollections} from '../../redux/reducers/storeReducer';
import toastService from '../../services/toast-service';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
const CollectionViewScreen = ({navigation, route}) => {
  const {collection} = route.params;
  const [selectedCollection, setSelectedCollection] = useState();
  const currentCollections = useSelector(state => state.store.collections);
  const [productIdToRemove, setProductIdToRemove] = useState('');
  const dispatch = useDispatch();

  const [collectionRemoveProducts, productRemoveResponse] = useMutation(
    REMOVE_PRODUCT_COLLECTION,
    {
      variables: {
        collectionId: collection.id,
        products: [productIdToRemove],
      },
    },
  );
  useEffect(() => {
    if (productRemoveResponse.data) {
      dispatch(setLoaderStatus(true));
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
      dispatch(setLoaderStatus(false));
      setSelectedCollection({
        ...collection,
        products:
          productRemoveResponse.data.collectionRemoveProducts.collection
            .products.edges,
      });
      toastService.showToast(
        'Product has been removed from the collection',
        true,
      );
    }
  }, [productRemoveResponse.data]);
  useEffect(() => {
    if (productIdToRemove && productIdToRemove !== '') {
      collectionRemoveProducts();
    }
  }, [productIdToRemove]);
  useEffect(() => {
    setSelectedCollection(collection);
  }, []);

  return (
    <View style={styles.collectionViewContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 80,
          justifyContent: 'center',
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0,0,0,0.2)',
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            color: 'black',
            fontFamily: 'Roboto-Bold',
          }}>
          {collection.name.toUpperCase()}
        </Text>
      </View>
      {/*<Image
        style={styles.imageStyle}
        source={
          collection.imageUrl !== ''
            ? {uri: collection.imageUrl}
            : require('../../assets/images/smugcat.jpg')
        }
      />*/}
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}>
        {selectedCollection &&
          selectedCollection.products.map(({node}) => {
            const product = {
              brandName: node.brand.brandName,
              id: node.id,
              name: node.name,
              thumbnail: node.thumbnail
                ? node.thumbnail.url
                : 'https://media-exp1.licdn.com/dms/image/C4E0BAQGymyKm7OE3wg/company-logo_200_200/0/1636442519943?e=2159024400&v=beta&t=19hHu3puobGsregS0-31D-KiANWe3NqrKZESktzQC30',
              price: node.pricing.priceRange
                ? node.pricing.priceRange.start.net.amount
                : 0,
            };
            return (
              <ProductCard
                key={product.id}
                inCollectionView={true}
                product={product}
                setProductIdToRemove={setProductIdToRemove}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default CollectionViewScreen;

const styles = StyleSheet.create({
  collectionViewContainer: {
    flex: 1,
  },
  imageStyle: {
    width: '100%',
    height: 150,
  },
});
