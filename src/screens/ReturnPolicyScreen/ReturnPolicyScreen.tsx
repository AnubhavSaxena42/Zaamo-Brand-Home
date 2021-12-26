import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const ReturnPolicyScreen = ({navigation, route}) => {
  return (
    <View style={styles.returnPolicyContainer}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/DashboardEllipse.png')}
          style={{
            height: 400,
            width: windowWidth,
            zIndex: 1,
            position: 'absolute',
            top: -300,
          }}
        />
        <Text
          style={{
            color: 'white',
            zIndex: 2,
            marginTop: '7%',
            fontSize: 22,
            paddingHorizontal: '10%',
            textAlign: 'center',
          }}>
          Return Policy
        </Text>
      </View>
      <ScrollView
        style={{
          paddingHorizontal: '5%',
          height: '90%',
          marginTop: '15%',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Return Policy</Text>
          <View
            style={{
              flexDirection: 'row',
              padding: '1%',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderColor: 'rgba(0,0,0,0.2)',
            }}>
            <Text>Edit</Text>
            <MaterialCommunityIcons name="pencil" size={12} color="black" />
          </View>
        </View>
        <Text style={{marginTop: '4%'}}>
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
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingsScreen')}
          style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReturnPolicyScreen;

const styles = StyleSheet.create({
  returnPolicyContainer: {
    flex: 1,
  },
  button: {
    marginBottom: '10%',
    height: 35,
    borderRadius: 10,
    marginTop: '10%',
    width: '25%',
    alignSelf: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
