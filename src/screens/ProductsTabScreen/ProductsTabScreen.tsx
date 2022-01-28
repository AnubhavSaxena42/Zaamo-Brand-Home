import React, {useState, useMemo, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  Animated,
  SafeAreaView,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import {tailwind} from '../../core/tailwind';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation, NetworkStatus, useQuery} from '@apollo/client';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BarIndicator} from 'react-native-indicators';
import {GET_AUTHORISED_BRANDS, GET_STORE} from '../DashboardScreen/queries';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import {setStoreCollections} from '../../redux/reducers/storeReducer';
import {UPDATE_COLLECTION} from './mutations';
import toastService from '../../services/toast-service';
import {WEBSERVER_BASE_URL} from '../../core/constants';
import {styles} from './styles';

const ProductsTabScreen = ({navigation}) => {
  const [isViewing, setIsViewing] = useState(1);
  const [isCollectionEdit, setIsCollectionEdit] = useState(false);
  const [editCollectionId, setIsEditCollectionId] = useState('');
  const [isNewCollectionModalVisible, setIsNewCollectionModalVisible] =
    useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [file, setFile] = useState();
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isThumbnailModalVisible, setIsThumbnailModalVisible] = useState(false);
  const [isCollectionError, setIsCollectionError] = useState(false);
  const [isThumbnailError, setIsThumbnailError] = useState(false);
  const [productsPageInfo, setProductsPageInfo] = useState({
    hasNextPage: true,
    endCursor: '',
  });
  const [collectionsPageInfo, setCollectionsPageInfo] = useState({
    hasNextPage: true,
    endCursor: '',
  });
  const [xTabOne, setXTabOne] = useState(0);
  const [xTabTwo, setXTabTwo] = useState(0);
  const [translateX, setTranslateX] = useState(new Animated.Value(0));
  const mobileNumber = useSelector(state => state.user.mobileNumber);
  const newCollections = useSelector(state => state.store.collections);
  const dispatch = useDispatch();
  const storeResponse = useQuery(GET_STORE, {
    variables: {
      collectionEndCursor: '',
    },
    notifyOnNetworkStatusChange: true,
  });
  useEffect(() => {
    if (storeResponse.data) {
      setCollectionsPageInfo(storeResponse.data.store.collections.pageInfo);
      const storeCollections = storeResponse.data.store.collections.edges.map(
        ({node}) => {
          return {
            id: node.id,
            products: node.products ? node.products.edges : [],
            imageUrl: node.imageUrl ? node.imageUrl : '',
            name: node.name ? node.name : '',
            slug: node?.slug,
            totalCount: node.products.totalCount
              ? node.products.totalCount
              : '0',
          };
        },
      );
      setCollections(storeCollections);
    }
  }, [storeResponse.data]);
  const onSelectTakePhoto = async () => {
    dispatch(setLoaderStatus(true));
    const res = await launchCamera(
      {
        cameraType: 'back',
        quality: 0.2,
      },
      result => {
        console.log('Real response', result);
        console.log(result);
        if (result.didCancel) {
          dispatch(setLoaderStatus(false));
          return;
        }
        var formData = new FormData();
        formData.append('file', {
          type: 'image/jpeg',
          name: result.assets[0].fileName,
          uri: result.assets[0].uri,
        });
        setFile(result.assets[0]);
        console.log(formData);
        /*axios({
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
            dispatch(setLoaderStatus(false));
          })
          .catch(function (response) {
            //handle error
            console.log(response);
            dispatch(setLoaderStatus(false));
          });
        */
        axios
          .get(`${WEBSERVER_BASE_URL}/presigned/url/toupload/`, {
            headers: {
              'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
            },
          })
          .then(res => {
            console.log(res.data);
            setThumbnailUri(res.data?.streaming_url);
            setIsThumbnailModalVisible(false);
            setIsNewCollectionModalVisible(true);
            dispatch(setLoaderStatus(false));
          })
          .catch(e => {
            console.log(e);
            setIsThumbnailError(true);
            dispatch(setLoaderStatus(false));
          });
      },
    );
  };
  const brandResponse = useQuery(GET_AUTHORISED_BRANDS, {
    variables: {
      mobileNo: '91' + mobileNumber,
      endCursor: '',
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (brandResponse.data) {
      if (
        brandResponse.data.userByMobile &&
        brandResponse.data.userByMobile.authorisedBrands[0] &&
        brandResponse.data.userByMobile.authorisedBrands[0].products
      ) {
        console.log('Here');
        console.log(brandResponse.data);
        const {hasNextPage, endCursor} =
          brandResponse.data.userByMobile.authorisedBrands[0].products.pageInfo;
        setProductsPageInfo({
          hasNextPage,
          endCursor,
        });
        const newStoreProducts =
          brandResponse.data.userByMobile.authorisedBrands[0].products.edges.map(
            ({node}) => {
              return {
                brandName: node.brand.brandName,
                id: node.id,
                name: node.name,
                url: node.url,
                slug: node.slug,
                description: JSON.parse(node?.descriptionJson)
                  ?.description_text,
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
            },
          );
        setProducts(newStoreProducts);
      }
    }
  }, [brandResponse.data]);
  /* useEffect(() => {
    if (brandResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [brandResponse.loading]);
*/
  const ErrorMessage = ({message}) => {
    return (
      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessageText}>
          {message ? message : 'This Field is required*'}
        </Text>
      </View>
    );
  };
  const _renderProduct = ({item}) => (
    <ProductCard navigation={navigation} product={item} />
  );
  const _renderCollection = ({item}) => (
    <CollectionCard
      navigation={navigation}
      key={item.id}
      editModalOpen={setIsNewCollectionModalVisible}
      isEditMode={setIsCollectionEdit}
      setThumbnailUri={setThumbnailUri}
      setNewCollectionName={setNewCollectionName}
      setIsEditCollectionId={setIsEditCollectionId}
      collection={item}
    />
  );
  const memoizedProduct = useMemo(() => _renderProduct, [products]);
  const memoizedCollection = useMemo(() => _renderCollection, [collections]);
  const [collectionUpdate, collectionUpdateResponse] = useMutation(
    UPDATE_COLLECTION,
    {
      variables: {
        input: {
          imageUrl: thumbnailUri,
          name: newCollectionName,
        },
        id: editCollectionId,
      },
    },
  );
  const onEditCollection = () => {
    collectionUpdate();
    setThumbnailUri('');
    setIsNewCollectionModalVisible(false);
    setNewCollectionName('');
    setIsCollectionEdit(false);
  };
  useEffect(() => {
    if (collectionUpdateResponse.data) {
      const updatedCollections = newCollections.map(collection => {
        if (
          collection.id ===
          collectionUpdateResponse.data.collectionUpdate.collection.id
        ) {
          return {
            ...collection,
            name: collectionUpdateResponse.data.collectionUpdate.collection
              .name,
            imageUrl:
              collectionUpdateResponse.data.collectionUpdate.collection
                .imageUrl,
          };
        } else {
          return collection;
        }
      });
      dispatch(setStoreCollections(updatedCollections));
      toastService.showToast('Collection has been updated', true);
    }
  }, [collectionUpdateResponse.data]);

  useEffect(() => {
    if (collectionUpdateResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [collectionUpdateResponse.loading]);
  const onSelectGallery = async () => {
    const result = await launchImageLibrary({}, async res => {
      dispatch(setLoaderStatus(true));
      console.log(res);
      if (res.didCancel) {
        dispatch(setLoaderStatus(false));
        return;
      }

      setFile(res.assets[0]);
      const fileToUpload = {
        type: 'image/jpeg',
        name: res.assets[0].fileName,
        uri: res.assets[0].uri,
      };
      /*galleryFormData.append('file', {
        type: 'image/jpeg',
        name: res.assets[0].fileName,
        uri: res.assets[0].uri,
      });
      console.log(galleryFormData);*/
      /*axios({
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
          dispatch(setLoaderStatus(false));
        })
        .catch(function (response) {
          //handle error
          console.log(response);
          dispatch(setLoaderStatus(false));
        });*/
      const [streamUrl, url, fileKey] = await axios
        .get(`${WEBSERVER_BASE_URL}/presigned/url/toupload/`, {
          headers: {
            'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
          },
        })
        .then(response => {
          console.log(response.data);
          return [
            response.data?.streaming_url,
            response.data?.url,
            response.data?.file_key,
          ];
          /*setThumbnailUri(res.data?.streaming_url);
          setIsThumbnailModalVisible(false);
          setIsNewCollectionModalVisible(true);
          dispatch(setLoaderStatus(false));*/
        })
        .catch(e => {
          return [null, null, null];
          /*setIsThumbnailError(true);
          dispatch(setLoaderStatus(false));*/
        });
      await axios
        .put(url, fileToUpload, {})
        .then(res => {
          console.log('image url Success: ', res);
          setThumbnailUri(streamUrl);
          setIsThumbnailModalVisible(false);
          setIsNewCollectionModalVisible(true);
          dispatch(setLoaderStatus(false));
        })
        .catch(err => {
          console.log('err:', err);
          setIsThumbnailError(true);
          dispatch(setLoaderStatus(false));
          console.log('Handle error');
        });
    });
  };
  const handleOnEndReached = () => {
    console.log('Next Page:', productsPageInfo.hasNextPage);

    if (productsPageInfo.hasNextPage && !brandResponse.loading) {
      console.log('FetchingMoreProducts');
      return brandResponse.fetchMore({
        variables: {
          mobileNo: '91' + mobileNumber,
          endCursor: productsPageInfo.endCursor,
        },
      });
    }
  };
  console.log('New Collection Modal:', isNewCollectionModalVisible);
  const handleOnEndCollectionsReached = () => {
    console.log('Next Page:', collectionsPageInfo.hasNextPage);

    if (collectionsPageInfo.hasNextPage && !storeResponse.loading) {
      console.log('FetchingMoreProducts');
      return storeResponse.fetchMore({
        variables: {
          collectionEndCursor: collectionsPageInfo.endCursor,
        },
      });
    }
  };

  const refreshing = brandResponse.networkStatus === NetworkStatus.refetch;
  const refreshingCollections =
    storeResponse.networkStatus === NetworkStatus.refetch;
  const handleSlide = type => {
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  return (
    <SafeAreaView style={styles.productsTabContainer}>
      {(isNewCollectionModalVisible || isThumbnailModalVisible) && (
        <Pressable
          onPress={() => {
            console.log('pressed');
            if (isNewCollectionModalVisible)
              setIsNewCollectionModalVisible(false);
            else setIsThumbnailModalVisible(false);
          }}
          style={styles.modalActiveBackdrop}
        />
      )}
      <View style={styles.headerStyle}>
        <Text style={styles.headingText}>
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
          style={styles.headerButtonPosition}>
          <Entypo name="plus" size={35} color={'white'} />
        </TouchableOpacity>
      </View>
      <View style={styles.switchTabContainer}>
        <View style={styles.switchTabContainerStyle}>
          <Animated.View
            style={{
              position: 'absolute',
              width: '50%',
              height: '100%',
              top: 0,
              left: 0,
              borderRadius: 5,
              backgroundColor: 'rgba(0,0,0,1)',
              transform: [{translateX}],
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setIsViewing(1);
              handleSlide(xTabOne);
            }}
            onLayout={event => setXTabOne(event.nativeEvent.layout.x)}
            style={styles.switchTabStyle}>
            <Text style={{color: isViewing === 1 ? 'white' : 'black'}}>
              Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsViewing(2);
              handleSlide(xTabTwo);
            }}
            onLayout={event => setXTabTwo(event.nativeEvent.layout.x)}
            style={styles.switchTabStyle}>
            <Text style={{color: isViewing === 2 ? 'white' : 'black'}}>
              Collections
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        transparent={true}
        presentationStyle="overFullScreen"
        visible={isThumbnailModalVisible}
        onRequestClose={() => setIsThumbnailModalVisible(false)}
        animationType="slide">
        <Pressable
          onPress={() => setIsThumbnailModalVisible(false)}
          style={styles.thumbnailModalBackdrop}>
          <Pressable onPress={() => {}} style={styles.thumbnailModalContainer}>
            <View style={styles.thumbnailModalHeader}>
              <Text style={styles.thumbnailModalHeaderText}>Upload Image</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsThumbnailModalVisible(false);
                  setIsNewCollectionModalVisible(true);
                }}
                style={styles.thumbnailModalHeaderCross}>
                <Entypo name="cross" size={14} color={'rgba(0,0,0,0.8)'} />
              </TouchableOpacity>
            </View>
            <View style={styles.thumbnailModalContentContainer}>
              <TouchableOpacity
                onPress={onSelectTakePhoto}
                style={styles.cameraOptionContainer}>
                <Entypo name="camera" size={40} color={'black'} />
                <Text style={styles.cameraOptionText}>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onSelectGallery}
                style={styles.galleryOptionContainer}>
                <FontAwesome name="photo" size={40} color={'black'} />
                <Text style={styles.galleryOptionText}>
                  Select from Gallery
                </Text>
              </TouchableOpacity>
            </View>
            {isThumbnailError && (
              <View style={styles.thumbnailErrorMessageContainer}>
                <ErrorMessage message={'Failed to upload,Please try again'} />
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        transparent={true}
        presentationStyle="overFullScreen"
        visible={isNewCollectionModalVisible}
        onRequestClose={() => setIsNewCollectionModalVisible(false)}
        animationType="slide">
        <Pressable
          onPress={() => {
            setIsNewCollectionModalVisible(false);
          }}
          style={styles.newCollectionModalBackdrop}>
          <Pressable
            onPress={() => {}}
            style={styles.newCollectionModalContainer}>
            <Text style={styles.newCollectionModalHeading}>
              {isCollectionEdit
                ? 'Edit Collection'
                : 'Excited for the new Collection!'}
            </Text>
            <Text style={styles.newCollectionModalLabel}>Collection Name</Text>
            <TextInput
              value={newCollectionName}
              onChangeText={text => setNewCollectionName(text)}
              style={styles.newCollectionNameInput}
              placeholder={'Enter Collection Name'}
            />
            <Text style={styles.newCollectionModalLabel}>
              {isCollectionEdit ? 'Update Thumbnail' : 'Thumbnail'}
            </Text>
            <View style={styles.newCollectionThumbnailUploadContainer}>
              <TouchableOpacity
                onPress={() => {
                  setIsNewCollectionModalVisible(false);
                  setIsThumbnailModalVisible(true);
                }}
                style={styles.newCollectionThumbnailUploadButton}>
                <Entypo name="upload" size={14} color={'white'} />
                <Text style={styles.newCollectionThumbnailUploadText}>
                  Upload
                </Text>
              </TouchableOpacity>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{width: '50%'}}>
                {file ? file.fileName : ''}
              </Text>
            </View>
            <TouchableOpacity
              onPress={
                isCollectionEdit
                  ? onEditCollection
                  : () => {
                      if (newCollectionName === '' || thumbnailUri === '') {
                        setIsCollectionError(true);
                        return;
                      }
                      setIsNewCollectionModalVisible(false);
                      navigation.navigate('CollectionProductsAddScreen', {
                        collectionName: newCollectionName,
                        collectionThumbnail: thumbnailUri,
                      });
                    }
              }
              style={styles.newCollectionConfirmButton}>
              {!isCollectionEdit && (
                <View style={styles.confirmButtonIcon}>
                  <Entypo name="plus" size={14} color={'black'} />
                </View>
              )}
              <Text style={styles.confirmButtonText}>
                {isCollectionEdit ? 'Update Collection' : 'Add Products'}
              </Text>
            </TouchableOpacity>
            {isCollectionError && (
              <ErrorMessage
                message={'Please fill in the collection name and upload image'}
              />
            )}
            <Text
              onPress={() => {
                if (isCollectionEdit) {
                  setThumbnailUri('');
                  setIsCollectionEdit(false);
                }
                setNewCollectionName('');
                setIsNewCollectionModalVisible(false);
              }}
              style={styles.newCollectionCancelText}>
              Cancel
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
      {isViewing === 1 && (
        <FlatList
          data={products}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.5}
          onRefresh={brandResponse.refetch}
          refreshing={refreshing}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: products.length === 0 ? 'center' : 'flex-start',
            paddingBottom: 30,
          }}
          ListEmptyComponent={
            !refreshing && !brandResponse.loading
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
            !refreshing && brandResponse.loading
              ? () => {
                  return (
                    <View style={styles.footerComponentContainer}>
                      <BarIndicator size={30} count={5} color="black" />
                    </View>
                  );
                }
              : null
          }
          keyExtractor={item => item.id}
          columnWrapperStyle={{justifyContent: 'space-around'}}
          renderItem={memoizedProduct}
        />
      )}
      {isViewing === 2 && (
        <FlatList
          data={collections}
          onEndReached={handleOnEndCollectionsReached}
          onEndReachedThreshold={0.5}
          onRefresh={storeResponse.refetch}
          refreshing={refreshingCollections}
          numColumns={1}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: collections.length === 0 ? 'center' : 'flex-start',
            paddingBottom: 25,
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !refreshingCollections && !storeResponse.loading
              ? () => (
                  <View
                    style={[
                      tailwind(
                        'bg-white mt-1 mx-10   rounded border border-gray-400 flex-row items-center justify-center',
                      ),
                      {},
                    ]}>
                    <MaterialIcons name="collections" size={40} color="black" />
                    <Text
                      style={tailwind(
                        'text-sm font-semibold text-center px-6 py-5 text-gray-600 ',
                      )}>
                      No Collections Found
                    </Text>
                  </View>
                )
              : null
          }
          ListFooterComponent={
            !refreshingCollections && storeResponse.loading
              ? () => {
                  return (
                    <View style={styles.footerComponentContainer}>
                      <BarIndicator size={30} count={5} color="black" />
                    </View>
                  );
                }
              : null
          }
          keyExtractor={item => item.id}
          renderItem={memoizedCollection}
        />
      )}
    </SafeAreaView>
  );
};

export default ProductsTabScreen;
