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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import {useSelector} from 'react-redux';
import {useMutation, useQuery} from '@apollo/client';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const ProductsTabScreen = ({navigation}) => {
  const [isViewing, setIsViewing] = useState(1);
  const [products, setProducts] = useState(
    useSelector(state => state.store.products),
  );
  const [isNewCollectionModalVisible, setIsNewCollectionModalVisible] =
    useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [file, setFile] = useState();
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [isThumbnailModalVisible, setIsThumbnailModalVisible] = useState(false);
  const user = useSelector(state => state.user.user);
  const [collections, setCollections] = useState(
    useSelector(state => state.store.collections),
  );

  console.log(file);
  const onSelectTakePhoto = async () => {
    const result = await launchCamera(
      {
        cameraType: 'back',
        quality: 0.5,
      },
      res => {},
    );
    console.log('Real response', result);
    console.log(result);
    if (result.didCancel) return;
    var formData = new FormData();
    formData.append('file', {
      type: 'image/jpeg',
      name: result.assets[0].fileName,
      uri: result.assets[0].uri,
    });
    setFile(result.assets[0]);
    console.log(formData);
    axios({
      method: 'post',
      url: 'https://betacontent.zaamo.co/engine/upload',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
      },
    })
      .then(function (response) {
        setThumbnailUri(response.data.url);
        setIsThumbnailModalVisible(false);
        setIsNewCollectionModalVisible(true);
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  console.log(thumbnailUri);
  const onSelectGallery = async () => {
    const result = await launchImageLibrary({}, res => {
      console.log(res);
      if (res.didCancel) return;
      var galleryFormData = new FormData();
      setFile(res.assets[0]);

      galleryFormData.append('file', {
        type: 'image/jpeg',
        name: res.assets[0].fileName,
        uri: res.assets[0].uri,
      });
      console.log(galleryFormData);
      axios({
        method: 'post',
        url: 'https://betacontent.zaamo.co/engine/upload',
        data: galleryFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
        },
      })
        .then(function (response) {
          setThumbnailUri(response.data.url);
          setIsThumbnailModalVisible(false);
          setIsNewCollectionModalVisible(true);
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    });
  };
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
            <ProductCard key={product.id} product={product} />
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
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingBottom: '5%',
                }}>
                <TouchableOpacity
                  onPress={onSelectTakePhoto}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Entypo name="camera" size={40} color={'black'} />
                  <Text>Take a Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onSelectGallery}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <FontAwesome name="photo" size={40} color={'black'} />
                  <Text>Select from Gallery</Text>
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
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{width: '50%'}}>
                  {file ? file.fileName : ''}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setIsNewCollectionModalVisible(false);
                  navigation.navigate('CollectionProductsAddScreen', {
                    collectionName: newCollectionName,
                    collectionThumbnail: thumbnailUri,
                  });
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
            return (
              <CollectionCard key={collection.id} collection={collection} />
            );
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
