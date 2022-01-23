import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CustomiseLandingPageScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.customiseLandingPageContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{zIndex: 2, top: 10, position: 'absolute', left: 10}}>
        <Ionicons name="arrow-back-sharp" color={'black'} size={35} />
      </TouchableOpacity>
      <AnimatedLottieView
        source={require('../../assets/animations/coming-soon.json')}
        style={styles.comingSoonStyle}
        loop
        autoPlay
      />
    </ScrollView>
  );
};

export default CustomiseLandingPageScreen;

const styles = StyleSheet.create({
  customiseLandingPageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  comingSoonStyle: {
    height: 160,
  },
});
