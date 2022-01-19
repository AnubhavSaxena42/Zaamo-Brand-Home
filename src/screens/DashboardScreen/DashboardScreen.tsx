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
import {client} from '../../App';
import MetricCard from '../../components/MetricCard/MetricCard';
import UpdateCard from '../../components/UpdateCard/UpdateCard';
import {
  deleteAllItemsFromStorage,
  getItemFromStorage,
} from '../../services/storage-service';
import {useSelector, useDispatch} from 'react-redux';
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
import toastService from '../../services/toast-service';

//For web it has to be a scrollview , implement fab properly
const DashboardScreen = ({navigation, route}) => {
  const windowWidth = Dimensions.get('window').width;
  const mobileNumber = useSelector(state => state.user.mobileNumber);
  const dispatch = useDispatch();
  const storeName = useSelector(state => state.store.storeInfo);
  console.log('Look:', storeName);
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
          storeUrl: storeResponse.data.store.storeUrl,
        }),
      );
      const storeCollections = storeResponse.data.store.collections.edges.map(
        ({node}) => {
          return {
            id: node.id,
            products: node.products ? node.products.edges : [],
            imageUrl: node.imageUrl ? node.imageUrl : '',
            name: node.name ? node.name : '',
            slug: node?.slug,
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
  const logout = () => {
    dispatch(setLoaderStatus(true));
    deleteAllItemsFromStorage()
      .then(() => {
        toastService.showToast('Logged out successfully', true);
        client.cache
          .reset()
          .then(() => {
            console.log('apollo success');
            navigation.replace('AuthStack');
            dispatch(setLoaderStatus(false));
          })
          .catch(() => {
            console.log('fail client');
            dispatch(setLoaderStatus(false));
          });
      })
      .catch(() => {
        toastService.showToast('Log out Fail', true);
        dispatch(setLoaderStatus(false));
      });
  };
  return (
    <View style={styles.dashboardContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            zIndex: 2,
            paddingTop: '3%',
            color: 'white',
            fontSize: 22,
            fontFamily: 'Roboto-Bold',
          }}>
          Overview
        </Text>
        {/*<TouchableOpacity
          style={{
            zIndex: 2,
            paddingRight: '5%',
            paddingTop: '5%',
          }}
          onPress={logout}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontFamily: 'Roboto-Bold',
            }}>
            Logout
          </Text>
        </TouchableOpacity>*/}
      </View>
      {
        <Image
          source={require('../../assets/images/DashboardEllipse.png')}
          style={{
            height: 350,
            width: windowWidth,
            zIndex: 1,
            position: 'absolute',
            top: -100,
          }}
        />
      }
      <View
        style={{
          zIndex: 2,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: '4%',
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
          justifyContent: 'center',
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
          height: 60,
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          zIndex: 3,
        }}>
        <Ionicons name="logo-instagram" size={30} color="white" />
      </TouchableOpacity>
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          paddingLeft: '3%',
          fontFamily: 'Roboto-Bold',
          marginBottom: '2%',
          marginTop: '2%',
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
