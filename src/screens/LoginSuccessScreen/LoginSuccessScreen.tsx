import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';

const LoginSuccessScreen = ({navigation, route}) => {
  return (
    <View style={styles.loginSuccessContainer}>
      <Image
        style={styles.imageStyle}
        source={require('../../assets/images/smugcat.jpg')}
      />
      <Text
        style={{
          fontSize: 24,
          marginBottom: '2%',
          color: 'black',
          fontWeight: '600',
          fontFamily: 'Roboto-Bold',
        }}>
        Congratulations
      </Text>
      <Text
        style={{fontSize: 14, marginBottom: '20%', color: 'rgba(0,0,0,0.5)'}}>
        You have succesfully signed in
      </Text>
      <Text style={{fontSize: 16, color: 'rgba(0,0,0,0.5)'}}>
        The Zaamo team will reach out to you shortly to
      </Text>
      <Text style={{fontSize: 16, color: 'rgba(0,0,0,0.5)'}}>
        activate your account
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginSuccessScreen')}
        style={styles.button}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          Continue to Store
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginSuccessScreen;

const styles = StyleSheet.create({
  loginSuccessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '50%',
    marginBottom: '10%',
  },
  button: {
    marginTop: '10%',
    height: '8%',
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
