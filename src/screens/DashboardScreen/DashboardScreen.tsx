import React, {useEffect} from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MetricCard from '../../components/MetricCard/MetricCard';
import UpdateCard from '../../components/UpdateCard/UpdateCard';
import {getItemFromStorage} from '../../services/storage-service';
import authService from '../../services/auth-service';
import {useSelector, useDispatch} from 'react-redux';
import {useQuery} from '@apollo/client';
import {GET_AUTHORISED_BRANDS, GET_COUPONS, GET_STORE} from './queries';
import {
  setStoreInfo,
  setStoreCollections,
  setStoreProducts,
  setStoreVouchers,
} from '../../redux/reducers/storeReducer';
import {setAuthorisedBrands} from '../../redux/reducers/userReducer';

//For web it has to be a scrollview , implement fab properly
const DashboardScreen = ({navigation, route}) => {
  const windowWidth = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const storeResponse = useQuery(GET_STORE);
  const brandResponse = useQuery(GET_AUTHORISED_BRANDS);
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
            products: node.products.edges,
            imageUrl: node.imageUrl,
            name: node.name,
          };
        },
      );
      dispatch(setStoreCollections(storeCollections));
    }
  }, [storeResponse.data]);
  useEffect(() => {
    if (brandResponse.data) {
      const newStoreProducts =
        brandResponse.data.userByMobile.authorisedBrands[0].products.edges.map(
          ({node}) => {
            return {
              brandName: node.brand.brandName,
              id: node.id,
              name: node.name,
              thumbnail: node.thumbnail.url,
              price: node.pricing.priceRange.start.net.amount,
            };
          },
        );
      dispatch(setStoreProducts(newStoreProducts));

      const authorisedBrands =
        brandResponse.data.userByMobile.authorisedBrands.map(brand => {
          return {
            name: brand.brandName,
            id: brand.id,
          };
        });
      dispatch(setAuthorisedBrands(authorisedBrands));
    }
  }, [brandResponse.data]);
  const couponResponse = useQuery(GET_COUPONS);
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
          fontWeight: 'bold',
          fontSize: 15,
          paddingLeft: '3%',
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
