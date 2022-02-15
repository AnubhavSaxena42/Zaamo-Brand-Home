import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Dimensions,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import {client} from '../../App';
import MetricCard from '../../components/MetricCard/MetricCard';
import UpdateCard from '../../components/UpdateCard/UpdateCard';
import {
  deleteAllItemsFromStorage,
  getItemFromStorage,
} from '../../services/storage-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {useQuery} from '@apollo/client';
import {GET_AUTHORISED_BRANDS, GET_COUPONS, GET_STORE} from '../../api/queries';
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
import AnimatedLottieView from 'lottie-react-native';
import {styles} from './styles';

const DashboardScreen = ({navigation, route}) => {
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

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Overview</Text>
      </View>
      <Image
        source={require('../../assets/images/DashboardEllipse.png')}
        style={styles.backgroundImageStyle}
      />
      <View style={styles.metricsTopContainer}>
        <MetricCard
          metric={{type: 'Total Orders', value: '-'}}
          color="lightpink"
        />
        <MetricCard
          metric={{type: 'Total Revenue', value: '-'}}
          color="darkseagreen"
        />
      </View>
      <View style={styles.metricsBottomContainer}>
        <MetricCard
          metric={{type: 'Store Visits', value: '-'}}
          color="palegoldenrod"
        />
        <MetricCard
          metric={{type: 'Product Views', value: '-'}}
          color="lightblue"
        />
      </View>
      {/* Insta World Button (Do Not Remove) */}
      {/*
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('InstaWorldScreen');
          }}
          style={styles.instaWorldButton}>
          <Ionicons name="logo-instagram" size={30} color="white" />
        </TouchableOpacity>
        */}
      <Text style={styles.updateHeadingText}>Recent Updates</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        {/* Updates will be rendered with the update cards below here */}
        {/*<UpdateCard />
        <UpdateCard />
        <UpdateCard />
        <UpdateCard />
        <UpdateCard />*/}
        <AnimatedLottieView
          source={require('../../assets/animations/coming-soon.json')}
          style={styles.comingSoonStyle}
          loop
          autoPlay
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
