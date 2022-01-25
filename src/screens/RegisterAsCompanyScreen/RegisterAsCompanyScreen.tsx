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
const windowWidth = Dimensions.get('window').width;
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
    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.registerAsCompanyContainer}>
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
            fontFamily: 'Roboto-Bold',
          }}>
          Register as a Company
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{zIndex: 2, marginTop: '6%', position: 'absolute', left: 10}}>
          <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AnimatedLottieView
          source={require('../../assets/animations/coming-soon.json')}
          style={{height: 160}}
          loop
          autoPlay
        />
      </View>
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

const styles = StyleSheet.create({
  registerAsCompanyContainer: {
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
