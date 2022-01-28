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
const ReturnPolicyScreen = ({navigation, route}) => {
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
        <Text style={styles.headerText}>Return Policy</Text>
      </View>
      <ScrollView style={styles.returnPolicyScrollViewContainer}>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderText}>Return Policy</Text>
          <TouchableOpacity
            onPress={() => {
              toastService.showToast('Feature in Development', true);
            }}
            style={styles.editButton}>
            <Text style={styles.subHeaderText}>Edit</Text>
            <MaterialCommunityIcons name="pencil" size={16} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.returnPolicyText}>
          We want you to love what you ordered, but if something isn't right,
          let us know. We'll give you an exchange on that piece in another
          color, a different size, or an entirely new style. In the unlikely
          event that any merchandise you have ordered from us is not received in
          good condition, is damaged or defective, or if merchandise delivered
          is different from what you had ordered, you may return the merchandise
          unused, and in the same condition as you received it, in its original
          packaging with original tags, for an exchange, within 14 days from the
          date on which these goods are delivered. Once received, the customer
          care team will see if all conditions are met, your credit/exchange
          would be processed. Please note: 1) Products once delivered cannot be
          returned. It can only be exchanged for another product or store
          credit. 2) Items will be considered for store credit/exchange only if
          it is unused and with all tags still attached. Returns that are
          damaged or soiled may not be accepted and may be sent back to the
          customer. Please inform our customer care department in the event of
          any Goods/products are delivered without tags. 3) Where provided,
          belts and any designer packaging such as muslin bags, should be
          included with your return 4) All custom-made orders are
          non-returnable. 5) No returns/Exchanges on discounted merchandise. 6)
          We do not Return/exchange Gift Cards, Cosmetics, Masks, Swimwear and
          Jewellery, unless it is a manufacturing defect.
        </Text>
        <TouchableOpacity
          onPress={() => {
            toastService.showToast('Feature in development', true);
            navigation.navigate('SettingsScreen');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReturnPolicyScreen;
