import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AddProductCard from '../../components/AddProductCard/AddProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {setStoreProducts} from '../../redux/reducers/storeReducer';
import {useMutation} from '@apollo/client';
import {COLLECTION_CREATE} from './mutations';
import {setStoreCollections} from '../../redux/reducers/storeReducer';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
const CollectionProductsAddScreen = ({navigation, route}) => {
  const products = useSelector(state => state.store.products);
  const collections = useSelector(state => state.store.collections);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const dispatch = useDispatch();
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
  console.log(selectedProducts);
  return (
    <View style={styles.collectionProductsAddScreenContainer}>
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
        <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
          Products
        </Text>
        <TouchableOpacity
          onPress={() => {
            collectionCreate();
          }}
          style={{
            backgroundColor: 'black',
            paddingHorizontal: '5%',
            paddingVertical: '5%',
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Create</Text>
        </TouchableOpacity>
      </View>
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
