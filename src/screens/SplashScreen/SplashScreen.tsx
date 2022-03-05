import React, {useEffect} from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {
  getItemFromStorage,
  saveItemToStorage,
} from '../../services/storage-service';
import {useDispatch} from 'react-redux';
import {
  setUser,
  setToken,
  setMobileNumber,
  setAuthorisedBrands,
  setShippingPolicy,
  setReturnPolicy,
  setBrandContactName,
  setBrandContactNumber,
  setBrandEmail,
  setBrandOrderInfo,
  setBrandBank,
} from '../../redux/reducers/userReducer';
import {
  setWarehouse,
  setStoreInfo,
  setStoreCollections,
  setStoreProducts,
} from '../../redux/reducers/storeReducer';
import {useLazyQuery} from '@apollo/client';
import {GET_AUTHORISED_BRANDS, GET_STORE} from '../../api/queries';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';

import {styles} from './styles';
const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [getBrand, brandResponse] = useLazyQuery(GET_AUTHORISED_BRANDS, {
    variables: {
      mobileNo: '',
      endCursor: '',
    },
    notifyOnNetworkStatusChange: true,
  });
  const [getStore, storeResponse] = useLazyQuery(GET_STORE, {
    variables: {
      collectionEndCursor: '',
    },
    notifyOnNetworkStatusChange: true,
  });
  //So messy refactor it !!
  /* Fetch the token,user,mobileNumber,firstTimeUser
    if we have the token user and mobileNumber redirect to StoreStack
    if we dont have token or user {
      if we have mobileNumber,redirect to LoginSuccessScreen
      if we dont have mobileNumber{
        if we have FirstTimeUser, redirect to mobileOTPScreen
        if we dont have FirstTimeUser, redirect to Carousel
      }
    }
  */
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
      console.log('STORE SET UP');
    }
  }, [storeResponse.data]);
  useEffect(() => {
    if (brandResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [brandResponse.loading]);
  useEffect(() => {
    if (brandResponse.data) {
      console.log('BRANDRESPONSE DATA:::', brandResponse.data);
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

        console.log(
          brandResponse.data.userByMobile.authorisedBrands[0]
            .brandContactNumber,
        );
        console.log(
          brandResponse.data.userByMobile.authorisedBrands[0].brandContactName,
        );
        const policies = JSON.parse(
          brandResponse.data.userByMobile.authorisedBrands[0]
            .shippingReturnPolicy,
        );

        const guidelines = JSON.parse(
          brandResponse.data.userByMobile.authorisedBrands[0]
            .zaamoCreatorsGuidelines,
        );
        console.log(
          brandResponse.data.userByMobile.authorisedBrands[0]
            .zaamoCreatorsGuidelines,
        );
        console.log('Guidelines::', guidelines);

        dispatch(setShippingPolicy(policies.shipping_policy));
        dispatch(setReturnPolicy(policies.return_policy));
        dispatch(
          setBrandContactName(
            brandResponse.data.userByMobile.authorisedBrands[0].staffMembers
              .edges[0]?.node.firstName +
              brandResponse.data.userByMobile.authorisedBrands[0].staffMembers
                .edges[0]?.node.lastName,
          ),
        );
        dispatch(
          setBrandContactNumber(
            brandResponse.data.userByMobile.authorisedBrands[0].staffMembers
              .edges[0]?.node.mobileNo,
          ),
        );
        dispatch(
          setBrandEmail(
            brandResponse.data.userByMobile.authorisedBrands[0].staffMembers
              .edges[0]?.node.email,
          ),
        );
        dispatch(
          setBrandOrderInfo(
            brandResponse.data.userByMobile.authorisedBrands[0].brandOrderInfo,
          ),
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
        dispatch(
          setBrandBank(
            brandResponse.data.userByMobile.authorisedBrands[0].bankAccount[0],
          ),
        );
        console.log('BRAND INFO SET');
        navigation.replace('StoreStack');
      }
    }
  }, [brandResponse.data]);

  const initApp = async () => {
    const token = await getItemFromStorage('Token');
    const user = await getItemFromStorage('User');
    const mobileNumber = await getItemFromStorage('Mobile Number');
    const isFirstTimeUser = await getItemFromStorage('First Time User');
    if (token && user && mobileNumber) {
      dispatch(setToken(token));
      dispatch(setUser(JSON.parse(user)));
      dispatch(setMobileNumber(mobileNumber));
      getBrand({
        variables: {
          mobileNo: '91' + mobileNumber,
          endCursor: '',
        },
      });
      getStore();
    } else {
      if (mobileNumber) {
        dispatch(setMobileNumber(mobileNumber));
        navigation.replace('LoginSuccessScreen', {
          mobileNumber: mobileNumber,
        });
      } else {
        if (!isFirstTimeUser) {
          await saveItemToStorage('First Time User', 'false');
          navigation.replace('BrandHomeOnboardingScreen');
        } else {
          navigation.replace('MobileOTPScreen');
        }
      }
    }
  };

  useEffect(() => {
    /*  GARBAGE KEEP IT HERE UNTIL TESTING JUST IN CASE 
    getItemFromStorage('Token')
      .then(token => {
        if (token && token !== '') {
          getItemFromStorage('User').then(user => {
            if (user && user !== '') {
              console.log('User:', user);
              const userObj = JSON.parse(user);
              dispatch(setToken(token));
              dispatch(setUser(userObj));
              getItemFromStorage('Mobile Number').then(mobileNumber => {
                if (mobileNumber) {
                  dispatch(setMobileNumber(mobileNumber));
                  navigation.replace('StoreStack');
                } else {
                  console.log('Mobile Number not found');
                  navigation.replace('StoreStack');
                }
              });
            }
          });
        } else {
          console.log('in else block 1');
          getItemFromStorage('First Time User').then(firstTimeUser => {
            if (!firstTimeUser) {
              console.log('First Time User:', firstTimeUser);
              saveItemToStorage('First Time User', 'false');
              navigation.navigate('BrandHomeOnboardingScreen');
            } else {
              console.log('Reaching where it should not reach');
              getItemFromStorage('Mobile Number').then(mobileNumber => {
                console.log('Mobile Number:', mobileNumber);
                if (mobileNumber && mobileNumber.length !== 0) {
                  navigation.replace('LoginSuccessScreen', {
                    mobileNumber: mobileNumber,
                  });
                } else {
                  navigation.replace('MobileOTPScreen');
                }
              });
            }
          });
        }
      })
      .catch(err => {
        //We will never reach here
        console.log('in else block');
        getItemFromStorage('Mobile Number')
          .then(mobileNumber => {
            console.log('Mobile Number:', mobileNumber);
            if (mobileNumber && mobileNumber.length !== 0) {
              navigation.replace('LoginSuccessScreen', {
                mobileNumber: mobileNumber,
              });
            } else {
              navigation.replace('MobileOTPScreen');
            }
          })
          .catch(err => {
            navigation.replace('MobileOTPScreen');
          });
      });
      */
    initApp();
  }, []);

  return (
    <View style={styles.splashScreenContainer}>
      <Image
        style={styles.splashScreenImage}
        source={require('../../assets/images/zaamo.jpg')}
      />
    </View>
  );
};

export default SplashScreen;
