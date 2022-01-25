import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native';
import toastService from '../../services/toast-service';
import AnimatedLottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const LogisticsSettingsScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.logisticsSettingsContainer}>
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
          Logistics Settings
        </Text>
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
          Shipping Fees
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
          placeholder={'0'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          COD Fees
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            color: 'gray',
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'0'}
        />
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

export default LogisticsSettingsScreen;

const styles = StyleSheet.create({
  logisticsSettingsContainer: {
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
