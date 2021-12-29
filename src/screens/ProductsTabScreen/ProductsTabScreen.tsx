import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import {useSelector} from 'react-redux';
import {useMutation, useQuery} from '@apollo/client';
import {COLLECTION_CREATE} from './mutations';
import {GET_STORE} from '../DashboardScreen/queries';
const ProductsTabScreen = ({navigation}) => {
  const [isViewing, setIsViewing] = useState(1);
  const [isNewCollectionModalVisible, setIsNewCollectionModalVisible] =
    useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [thumbnail, setThumbnail] = useState(
    'https://images.squarespace-cdn.com/content/v1/5ccabcf60b77bdbb3acaf70a/1587274251173-I67O9CS83EG04P3EQV4R/Clannad-Pics-clannad-and-clannad-after-story-24746547-1920-1200.jpg',
  );
  const [isThumbnailModalVisible, setIsThumbnailModalVisible] = useState(false);
  const user = useSelector(state => state.user.user);
  const [collections, setCollections] = useState([]);
  console.log(user.authorisedBrands[0]);
  const [collectionCreate, {data, error, loading}] = useMutation(
    COLLECTION_CREATE,
    {
      variables: {
        name: newCollectionName,
        imageUrl: thumbnail,
      },
    },
  );
  const storeResponse = useQuery(GET_STORE);
  useEffect(() => {
    const newCollections = storeResponse.data.store.collections.edges.map(
      collection => collection.node,
    );
    setCollections(newCollections);
  }, [storeResponse]);
  const products =
    user.authorisedBrands.length !== 0
      ? user.authorisedBrands[0].products.edges.map(({node}) => {
          return {
            brandName: node.brand.brandName,
            id: node.id,
            name: node.name,
            thumbnail: node.thumbnail.url,
            price: node.pricing.priceRange.start.net.amount,
          };
        })
      : [];
  console.log(data, error, loading);

  return (
    <View style={styles.productsTabContainer}>
      {(isNewCollectionModalVisible || isThumbnailModalVisible) && (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 5,
          }}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: '10%',
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
          {isViewing === 1 ? 'Products' : 'Collections'}
        </Text>
        <TouchableOpacity
          onPress={
            isViewing === 1
              ? () => {
                  navigation.navigate('CreateProductScreen', {
                    fromBrandHome: true,
                  });
                }
              : () => {
                  setIsNewCollectionModalVisible(true);
                }
          }
          style={{
            position: 'absolute',
            right: 5,
            top: '25%',
            alignContent: 'flex-end',
          }}>
          <Entypo name="plus" size={35} color={'black'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '90%',
          height: '5%',
          borderRadius: 20,
          marginTop: '2%',
          flexDirection: 'row',
          alignSelf: 'center',
          marginBottom: '3%',
        }}>
        <TouchableOpacity
          onPress={() => setIsViewing(1)}
          style={{
            backgroundColor: isViewing === 1 ? 'black' : 'whitesmoke',
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: isViewing === 1 ? 'white' : 'black'}}>
            Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsViewing(2)}
          style={{
            backgroundColor: isViewing === 2 ? 'black' : 'whitesmoke',
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: isViewing === 2 ? 'white' : 'black'}}>
            Collections
          </Text>
        </TouchableOpacity>
      </View>
      {isViewing === 1 && (
        <ScrollView
          contentContainerStyle={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}>
          {products.map(product => (
            <ProductCard product={product} />
          ))}
        </ScrollView>
      )}
      {isViewing === 2 && (
        <ScrollView
          contentContainerStyle={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}>
          <Modal
            transparent={true}
            visible={isThumbnailModalVisible}
            animationType="slide">
            <View
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '35%',
                paddingHorizontal: '4%',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: '5%',
                  marginVertical: '5%',
                }}>
                <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
                  Upload Image
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsThumbnailModalVisible(false);
                    setIsNewCollectionModalVisible(true);
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderColor: 'rgba(0,0,0,0.8)',
                    borderWidth: 2,
                  }}>
                  <Entypo name="cross" size={14} color={'rgba(0,0,0,0.8)'} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            transparent={true}
            visible={isNewCollectionModalVisible}
            animationType="slide">
            <View
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                paddingHorizontal: '4%',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 20,
                  fontWeight: '700',
                  marginVertical: '4%',
                }}>
                Excited for the new Collection!
              </Text>
              <Text
                style={{
                  marginVertical: '2%',
                  fontSize: 16,
                  color: 'black',
                  fontWeight: '500',
                }}>
                Collection Name
              </Text>
              <TextInput
                value={newCollectionName}
                onChangeText={text => setNewCollectionName(text)}
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.3)',
                  borderRadius: 4,
                  paddingHorizontal: '5%',
                  backgroundColor: 'white',
                }}
                placeholder={'Enter Collection Name'}
              />
              <Text
                style={{
                  marginVertical: '2%',
                  fontSize: 16,
                  color: 'black',
                  fontWeight: '500',
                }}>
                Thumbnail
              </Text>
              <View
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.3)',
                  borderRadius: 4,
                  height: '12%',
                  paddingHorizontal: '1%',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsNewCollectionModalVisible(false);
                    setIsThumbnailModalVisible(true);
                  }}
                  style={{
                    height: '80%',
                    backgroundColor: 'black',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    paddingHorizontal: '5%',
                  }}>
                  <Entypo name="upload" size={14} color={'white'} />
                  <Text style={{color: 'white'}}>Upload</Text>
                </TouchableOpacity>
                <Text>Filename.png</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  collectionCreate();
                  setIsNewCollectionModalVisible(false);
                }}
                style={{
                  width: '100%',
                  backgroundColor: 'black',
                  borderRadius: 4,
                  height: '15%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: '5%',
                  paddingHorizontal: '5%',
                }}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    marginRight: '2%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                  }}>
                  <Entypo name="plus" size={14} color={'black'} />
                </View>
                <Text style={{color: 'white'}}>Add Products</Text>
              </TouchableOpacity>
              <Text
                onPress={() => {
                  setNewCollectionName('');
                  setIsNewCollectionModalVisible(false);
                }}
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 14,
                  fontWeight: '600',
                  marginTop: '5%',
                }}>
                Cancel
              </Text>
            </View>
          </Modal>

          {collections.map(collection => {
            return <CollectionCard collection={collection} />;
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default ProductsTabScreen;

const styles = StyleSheet.create({
  productsTabContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
