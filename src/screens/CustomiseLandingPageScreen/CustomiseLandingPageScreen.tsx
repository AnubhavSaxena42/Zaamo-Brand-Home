import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
const CustomiseLandingPageScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.customiseLandingPageContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Ionicons name="arrow-back-sharp" color={'black'} size={35} />
      </TouchableOpacity>
      <AnimatedLottieView
        source={require('../../assets/animations/coming-soon.json')}
        style={styles.comingSoonStyle}
        loop
        autoPlay
      />
    </SafeAreaView>
  );
};

export default CustomiseLandingPageScreen;
