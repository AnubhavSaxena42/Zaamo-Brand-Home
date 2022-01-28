import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CouponOverview from '../../components/CouponOverview/CouponOverview';
import {styles} from './styles';
const windowWidth = Dimensions.get('window').width;

const CouponInfoScreen = ({navigation, route}) => {
  console.log(route.params.coupon);
  return (
    <SafeAreaView style={styles.couponInfoContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.couponInfoScrollViewContainer}>
        <Image
          source={require('../../assets/images/DashboardEllipse.png')}
          style={styles.backgroundImageStyle}
        />
        <View style={styles.couponInfoHeaderContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
          </TouchableOpacity>
          <Text style={styles.couponInfoHeaderText}>Marketing</Text>
        </View>
        <CouponOverview coupon={route.params.coupon} />
        <View style={styles.couponDescriptionContainer}>
          <Text style={styles.couponDescriptionHeaderText}>Description</Text>
          <Text style={styles.couponDescriptionText}>
            {route.params.coupon.metadata[0].value}
          </Text>
        </View>
        <View style={styles.couponApplicableProductsContainer}>
          <Text style={styles.couponApplicableProductsHeaderText}>
            Applicable Products
          </Text>
          {route.params.coupon.products.edges.map(({node}) => {
            return (
              <View key={node.code} style={styles.applicableProductContainer}>
                <Image
                  style={styles.applicableProductImage}
                  source={{uri: node.thumbnail?.url ? node.thumbnail?.url : ''}}
                />
                <Text style={styles.applicableProductName}>{node.name}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CouponInfoScreen;
