import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  Image,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import toastService from '../../services/toast-service';
const windowWidth = Dimensions.get('window').width;
const TermsAndConditionsScreen = ({navigation, route}) => {
  return (
    <View style={styles.termsAndConditionsContainer}>
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{zIndex: 2, marginTop: '6%', position: 'absolute', left: 10}}>
          <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
        </TouchableOpacity>

        <Text
          style={{
            color: 'white',
            zIndex: 2,
            marginTop: '7%',
            fontSize: 22,
            paddingHorizontal: '10%',
            textAlign: 'center',
            fontFamily: 'Roboto-Bold',
          }}>
          Terms And Conditions
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
          <Text>Terms And Conditions</Text>

          <TouchableOpacity
            onPress={() => {
              toastService.showToast('Feature in Development', true);
            }}
            style={{
              flexDirection: 'row',
              padding: '1%',
              borderWidth: 1,
              justifyContent: 'space-between',
              paddingHorizontal: '3%',
              alignItems: 'center',
              width: 70,
              borderRadius: 4,
              borderColor: 'rgba(0,0,0,0.2)',
            }}>
            <Text>Edit</Text>
            <MaterialCommunityIcons name="pencil" size={16} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: '4%'}}>
          These are the general terms and conditions governing your use of this
          website and our services. By accessing, browsing, using or signing up
          for this website, our newsletters or social media updates, or any
          other services and features, you are concluding a legally binding
          agreement with House of Masaba Lifestyle Private Limited on the terms
          set out under this policy. Personal information which we collect or
          that we otherwise obtain in connection with your access or use of this
          website is handled in accordance with our privacy policy (accessible
          here www.houseofmasaba.com/pages/privacy-policy) (“Privacy Policy”).
          Your continued use of this website and our services constitutes your
          explicit consent to our Privacy Policy. Introduction This website
          www.houseofmasaba.comand the information, content, products and
          services it makes available (which shall collectively be hereinafter
          referred to as the “Website”), is provided to you by House of Masaba
          Lifestyle Private Limited, an entity incorporated under the laws of
          India, having its principal office at406, Morya House Premises Co Op
          Soc Ltd Off New Link Road, Andheri (West), Mumbai, Maharashtra, India-
          400053(“House of Masaba“, “We” or “Us”). These terms of use (the
          “Terms of Use“) set forth the terms and conditions governing your use
          of this Website.. For the purposes of this Terms of Use, the term
          "You" or "Your" shall refer to the end user (customer of the store).
          If You are using the Website or services on behalf of Your company (or
          another entity), then "You" means Your company (or such other entity),
          its officers, members, agents, successors and assigns. Before using
          the services rendered by House of Masaba through this Website, you are
          requested to read and understand the Terms of Use specified herein.
          You are required to read and understand the existing Terms of Use
          every time before using the services offered by Us. Lack of knowledge
          related to any terms of Terms of Use or the amendments affected to the
          Terms of Use from time to time may not absolve you from any of your
          liabilities under the Terms of Use. House of Masaba expects you to
          further read and understand the Privacy Policy which would be treated
          as a part of this Terms of Use before using the services offered by
          Us. You shall be equally bound by the stipulations therein once you
          agree to the Terms of Use with House of Masaba.
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
          onPress={() => {
            toastService.showToast('Feature in Development', true);
            navigation.navigate('SettingsScreen');
          }}
          style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  termsAndConditionsContainer: {
    flex: 1,
    backgroundColor: 'white',
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
