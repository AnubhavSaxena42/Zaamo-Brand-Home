import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
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
import {styles} from './styles';

const LogisticsSettingsScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.logisticsSettingsContainer}>
      <ScrollView contentContainerStyle={styles.logisticsSettingsContainer}>
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

          <Text style={styles.headerText}>Logistics Settings</Text>
        </View>
        <View style={styles.animationContainer}>
          <AnimatedLottieView
            source={require('../../assets/animations/coming-soon.json')}
            style={styles.animation}
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
