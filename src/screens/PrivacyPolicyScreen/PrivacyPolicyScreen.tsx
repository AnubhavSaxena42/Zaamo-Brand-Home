import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import toastService from '../../services/toast-service';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
import AnimatedLottieView from 'lottie-react-native';

const PrivacyPolicyScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.privacyPolicyContainer}>
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

        <Text style={styles.headerText}>Privacy Policy</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.privacyPolicyScrollViewContainer}>
        <View style={styles.animationContainer}>
          <AnimatedLottieView
            source={require('../../assets/animations/coming-soon.json')}
            style={styles.animation}
            loop
            autoPlay
          />
        </View>
        {/*<View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderText}>Privacy Policy</Text>
          <TouchableOpacity
            onPress={() => {
              toastService.showToast('Contact Zaamo Support', true);
            }}
            style={styles.editButton}>
            <Text style={styles.subHeaderText}>Edit</Text>
            <MaterialCommunityIcons name="pencil" size={16} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.privacyPolicyText}></Text>
        <TouchableOpacity
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

export default PrivacyPolicyScreen;
