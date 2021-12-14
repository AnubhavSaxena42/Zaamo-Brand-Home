import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ConnectInstaScreen = ({navigation, route}) => {
  return (
    <View style={styles.connectInstaContainer}>
      <View style={styles.iconContainer}>
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          color={'rgba(0,0,0,0.5)'}
        />
      </View>
      <Text style={{...styles.heading, marginTop: '18%'}}>
        Lets connect with your
      </Text>
      <Text
        style={{
          ...styles.heading,
          color: 'black',
          fontWeight: 'bold',
          marginBottom: '20%',
        }}>
        Instagram
      </Text>
      <Image
        style={styles.imageStyle}
        source={require('../../assets/images/smugcat.jpg')}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('LoginSuccessScreen')}
        style={styles.button}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          Connect Your IG
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 16,
          marginTop: '12%',
        }}>
        Request Manual Verification
      </Text>
    </View>
  );
};

export default ConnectInstaScreen;

const styles = StyleSheet.create({
  connectInstaContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    width: '50%',
    marginBottom: '10%',
  },
  heading: {
    fontSize: 24,
    color: 'rgba(0,0,0,0.5)',
  },
  iconContainer: {
    position: 'absolute',
    top: '2%',
    left: '5%',
  },
  button: {
    height: '8%',
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
