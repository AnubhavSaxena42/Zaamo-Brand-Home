import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Text,
  Image,
  View,
} from 'react-native';

const SettingOption = ({setting, onPress, imageUrl}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 60,
        width: 150,
        marginVertical: '4%',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          zIndex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: '7%',
          borderRadius: 10,
        }}>
        <Text style={{textAlign: 'center', color: 'rgba(0,0,0,0.6)'}}>
          {setting}
        </Text>
      </View>
      <View
        style={{
          height: 40,
          width: 40,
          borderWidth: 1,
          position: 'absolute',
          top: -25,
          left: '35%',
          borderRadius: 20,
          borderColor: 'rgba(0,0,0,0.2)',
          zIndex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image source={imageUrl} style={{height: 20, width: 20}} />
      </View>
    </Pressable>
  );
};

export default SettingOption;

const styles = StyleSheet.create({});
