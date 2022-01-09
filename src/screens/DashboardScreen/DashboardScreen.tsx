import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MetricCard from '../../components/MetricCard/MetricCard';
import UpdateCard from '../../components/UpdateCard/UpdateCard';
import {getItemFromStorage} from '../../services/storage-service';
import authService from '../../services/auth-service';
import {useSelector, useDispatch} from 'react-redux';
import {request, PERMISSIONS, openSettings} from 'react-native-permissions';
import {useQuery} from '@apollo/client';
import {GET_AUTHORISED_BRANDS, GET_COUPONS, GET_STORE} from './queries';
import {
  setStoreInfo,
  setStoreCollections,
  setStoreProducts,
  setStoreVouchers,
  setWarehouse,
} from '../../redux/reducers/storeReducer';
import {setAuthorisedBrands} from '../../redux/reducers/userReducer';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';

//For web it has to be a scrollview , implement fab properly
const DashboardScreen = ({navigation, route}) => {
  const windowWidth = Dimensions.get('window').width;
  const mobileNumber = useSelector(state => state.user.mobileNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    handlePermission();
  }, []);

  const handlePermission = async () => {
    async function requestAll() {
      const cameraStatus = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      });

      const audioStatus = Platform.select({
        android: PERMISSIONS.ANDROID.RECORD_AUDIO,
        ios: PERMISSIONS.IOS.CAMERA, //ios only
      });

      const photoLibrary = Platform.select({
        // android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      });

      const writePhotoLibrary = Platform.select({
        android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      });

      const isCamera = await request(cameraStatus);
      const isAudio = await request(audioStatus);
      const isPhotoLibrary = await request(photoLibrary);
      const isWritePhotoLibrary = await request(writePhotoLibrary);
      return {isCamera, isAudio, isPhotoLibrary, isWritePhotoLibrary};
    }

    requestAll().then(status => {
      console.log('status', status);
      if (
        status.isAudio == 'granted' &&
        status.isCamera == 'granted' &&
        status.isPhotoLibrary == 'granted' &&
        status.isWritePhotoLibrary == 'granted'
      ) {
        console.log('Permissions Granted');
      } else {
        Alert.alert(
          '',
          'All Permission' +
            ' is required to use this app. Please grant the permission to continue',
          [
            {
              text: 'OK',
              onPress: () => {
                if (
                  status.isAudio == 'blocked' ||
                  status.isCamera == 'blocked' ||
                  status.isPhotoLibrary == 'blocked' ||
                  status.isWritePhotoLibrary == 'blocked'
                ) {
                  openSettings();
                } else {
                  handlePermission();
                }
              },
            },
          ],
        );
      }
    });
  };

  const storeResponse = useQuery(GET_STORE);
  const brandResponse = useQuery(GET_AUTHORISED_BRANDS, {
    variables: {
      mobileNo: '91' + mobileNumber,
      endCursor: '',
    },
  });
  useEffect(() => {
    if (storeResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [storeResponse.loading]);
  useEffect(() => {
    if (brandResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [brandResponse.loading]);
  useEffect(() => {
    if (storeResponse.data) {
      dispatch(
        setStoreInfo({
          id: storeResponse.data.store.id,
          storeName: storeResponse.data.store.storeName,
          storeType: storeResponse.data.store.storeType,
        }),
      );
      const storeCollections = storeResponse.data.store.collections.edges.map(
        ({node}) => {
          return {
            id: node.id,
            products: node.products ? node.products.edges : [],
            imageUrl: node.imageUrl ? node.imageUrl : '',
            name: node.name ? node.name : '',
          };
        },
      );
      dispatch(setStoreCollections(storeCollections));
    }
  }, [storeResponse.data]);
  useEffect(() => {
    if (brandResponse.data) {
      console.log('Look here:', brandResponse.data);
      if (
        brandResponse.data.userByMobile &&
        brandResponse.data.userByMobile.authorisedBrands[0] &&
        brandResponse.data.userByMobile.authorisedBrands[0].products
      ) {
        const newStoreProducts =
          brandResponse.data.userByMobile.authorisedBrands[0].products.edges.map(
            ({node}) => {
              return {
                brandName: node.brand.brandName,
                id: node.id,
                name: node.name,
                url: node.url,
                thumbnail: node.thumbnail
                  ? node.thumbnail.url
                  : 'https://media-exp1.licdn.com/dms/image/C4E0BAQGymyKm7OE3wg/company-logo_200_200/0/1636442519943?e=2159024400&v=beta&t=19hHu3puobGsregS0-31D-KiANWe3NqrKZESktzQC30',
                price: node.pricing.priceRange
                  ? node.pricing.priceRange.start.net.amount
                  : 0,
              };
            },
          );
        dispatch(setStoreProducts(newStoreProducts));

        const warehouseId =
          brandResponse.data.userByMobile.authorisedBrands[0].warehouse;
        dispatch(setWarehouse(warehouseId));

        const authorisedBrands =
          brandResponse.data.userByMobile.authorisedBrands.map(brand => {
            return {
              name: brand.brandName,
              id: brand.id,
            };
          });
        dispatch(setAuthorisedBrands(authorisedBrands));
      }
    }
  }, [brandResponse.data]);
  const couponResponse = useQuery(GET_COUPONS, {});
  useEffect(() => {
    console.log('data update');
    if (couponResponse.data) {
      const newCoupons = couponResponse.data.vouchers.edges.map(({node}) => {
        return node;
      });

      dispatch(setStoreVouchers(newCoupons));
    }
  }, [couponResponse.data]);

  return (
    <View style={styles.dashboardContainer}>
      <Text
        style={{
          zIndex: 2,
          paddingLeft: '3%',
          paddingTop: '5%',
          color: 'white',
          fontSize: 18,
          fontFamily: 'Roboto-Bold',
        }}>
        Overview
      </Text>
      {
        <Image
          source={require('../../assets/images/DashboardEllipse.png')}
          style={{
            height: 400,
            width: windowWidth,
            zIndex: 1,
            position: 'absolute',
            top: -80,
          }}
        />
      }
      <View
        style={{
          zIndex: 2,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: '10%',
        }}>
        <MetricCard
          metric={{type: 'Total Orders', value: '27'}}
          color="lightpink"
        />
        <MetricCard
          metric={{type: 'Total Revenue', value: '12,738'}}
          color="darkseagreen"
        />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          zIndex: 2,
        }}>
        <MetricCard
          metric={{type: 'Store Visits', value: '270'}}
          color="palegoldenrod"
        />
        <MetricCard
          metric={{type: 'Product Views', value: '127'}}
          color="lightblue"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('InstaWorldScreen');
        }}
        style={{
          backgroundColor: 'black',
          position: 'absolute',
          bottom: 50,
          right: 20,
          height: 70,
          width: 70,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 35,
          zIndex: 3,
        }}>
        <Ionicons name="logo-instagram" size={35} color="white" />
      </TouchableOpacity>
      <Text
        style={{
          color: 'black',

          fontSize: 15,
          paddingLeft: '3%',
          fontFamily: 'Roboto-Bold',
        }}>
        Recent Updates
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UpdateCard />
        <UpdateCard />
        <UpdateCard />
        <UpdateCard />
        <UpdateCard />
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  metricsContainer: {
    width: '100%',
  },
});
