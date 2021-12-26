import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const CustomiseLandingPageScreen = () => {
  return (
    <View style={styles.customiseLandingPageContainer}>
      <Text
        style={{
          fontSize: 16,
          marginBottom: '2%',
          color: 'black',
          textAlign: 'center',
        }}>
        NO DESIGNS AVAILABLE FOR THIS PAGE
      </Text>
      <Image
        source={require('../../assets/images/Mitsuba.jpg')}
        style={{height: 300, width: 300}}
      />
    </View>
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
