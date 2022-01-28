import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import AnimatedLottieView from 'lottie-react-native';
import toastService from '../../services/toast-service';
import {styles} from './styles';
const RegisterAsCompanyScreen = ({navigation, route}) => {
  const onPANUpload = () => {
    launchImageLibrary({}, res => {
      if (res.didCancel) {
        toastService.showToast('Upload Cancelled', true);
      } else {
        console.log(res.assets);
        toastService.showToast('PAN Card Uploaded', true);
      }
    });
  };
  const onGSTUpload = () => {
    launchImageLibrary({}, res => {
      if (res.didCancel) {
        toastService.showToast('Upload Cancelled', true);
      } else {
        console.log(res.assets);
        toastService.showToast('GST Certificate Uploaded', true);
      }
    });
  };
  return (
    <SafeAreaView style={styles.registerAsCompanyContainer}>
      <ScrollView contentContainerStyle={styles.registerAsCompanyContainer}>
        <View style={styles.registerAsCompanyHeaderContainer}>
          <Image
            source={require('../../assets/images/DashboardEllipse.png')}
            style={styles.backgroundImage}
          />
          <Text style={styles.headerText}>Register as a Company</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.animationContainer}>
          <AnimatedLottieView
            source={require('../../assets/animations/coming-soon.json')}
            style={styles.animation}
            loop
            autoPlay
          />
        </View>
        {/* DO NOT DELETE JSX BELOW */}
        {/*<View
        style={{
          paddingHorizontal: '5%',
          height: '90%',
          marginTop: '15%',
          width: '100%',
        }}>
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Name as printed on the GST Certificate
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            color: 'gray',
            paddingHorizontal: '5%',
            backgroundColor: 'white',
          }}
          placeholder={'Enter Name'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          GST Information
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            color: 'gray',
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Enter GST Number'}
        />
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',
            marginTop: '2%',
          }}>
          <TouchableOpacity onPress={onGSTUpload}>
            <Entypo name="plus" size={25} color={'black'} />
          </TouchableOpacity>
          <Text style={{color: 'gray', marginLeft: '5%'}}>
            Upload a photo of your GST certificate
            <Text style={{color: 'red'}}>*</Text>
          </Text>
        </View>
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          PAN Card Details
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            color: 'gray',
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Enter PAN Number'}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '2%',
          }}>
          <TouchableOpacity onPress={onPANUpload}>
            <Entypo name="plus" size={25} color={'black'} />
          </TouchableOpacity>
          <Text style={{color: 'gray', marginLeft: '5%'}}>
            Upload a photo of your PAN Card
            <Text style={{color: 'red'}}>*</Text>
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          position: 'absolute',
          bottom: 25,
        }}>
        <TouchableOpacity
          onPress={() => {
            toastService.showToast('Feature in Development', true);
            navigation.navigate('SettingsScreen');
          }}
          style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterAsCompanyScreen;
