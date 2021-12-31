import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AddProductCard from '../../components/AddProductCard/AddProductCard';
import {useSelector} from 'react-redux';
import {setStoreProducts} from '../../redux/reducers/storeReducer';
import {useMutation} from '@apollo/client';
import {COLLECTION_CREATE} from './mutations';

const CollectionProductsAddScreen = ({navigation, route}) => {
  const products = useSelector(state => state.store.products);
  const [selectedProducts, setSelectedProducts] = useState([]);
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
      console.log(data);
      if (data.collectionCreate.collection) {
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
