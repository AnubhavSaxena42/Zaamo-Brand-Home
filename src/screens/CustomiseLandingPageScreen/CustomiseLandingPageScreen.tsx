import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CustomiseLandingPageScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.customiseLandingPageContainer}>
      <Text
        style={{
          fontSize: 16,
          marginBottom: '2%',
          color: 'black',
          textAlign: 'center',
        }}>
        NO DESIGNS AVAILABLE FOR THIS PAGE
      </Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{zIndex: 2, top: 10, position: 'absolute', left: 10}}>
        <Ionicons name="arrow-back-sharp" color={'black'} size={35} />
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/smugcat.jpg')}
        style={{height: 300, width: 300}}
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
  },
});
