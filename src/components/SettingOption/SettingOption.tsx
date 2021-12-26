import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';

const SettingOption = ({setting, onPress, imageUrl}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{height: 60, width: 150, marginVertical: '4%'}}>
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
        <Text style={{textAlign: 'center'}}>{setting}</Text>
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
    </TouchableOpacity>
  );
};

export default SettingOption;

const styles = StyleSheet.create({});
