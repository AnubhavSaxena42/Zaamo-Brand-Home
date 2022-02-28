import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import toastService from '../../services/toast-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import {useSelector} from 'react-redux';
const CustomerSupportDetailsScreen = ({navigation, route}) => {
  const brandOrderInfo = useSelector(state => state.user.brandOrderInfo);
  return (
    <SafeAreaView style={styles.returnPolicyContainer}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/images/DashboardEllipse.png')}
          style={styles.backgroundImage}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Customer Support Details</Text>
      </View>
      <ScrollView style={styles.returnPolicyScrollViewContainer}>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderText}>Customer Support Details</Text>
          {/*<TouchableOpacity
            onPress={() => {
              toastService.showToast('Contact Zaamo Support', true);
            }}
            style={styles.editButton}>
            <Text style={styles.subHeaderText}>Edit</Text>
            <MaterialCommunityIcons name="pencil" size={16} color="black" />
          </TouchableOpacity>*/}
        </View>
        <Text style={styles.returnPolicyText}>{brandOrderInfo}</Text>
        {/*<TouchableOpacity
          onPress={() => {
            toastService.showToast('Contact Zaamo Support', true);
            navigation.navigate('SettingsScreen');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerSupportDetailsScreen;
