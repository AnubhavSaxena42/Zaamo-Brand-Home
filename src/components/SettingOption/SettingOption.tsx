import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Text,
  Image,
  View,
} from 'react-native';
import {styles} from './styles';
const SettingOption = ({setting, onPress, imageUrl}) => {
  return (
    <Pressable onPress={onPress} style={styles.settingOptionContainer}>
      <View style={styles.settingOptionInfoContainer}>
        <Text style={styles.settingOptionText}>{setting}</Text>
      </View>
      <View style={styles.settingOptionIconContainer}>
        <Image source={imageUrl} style={styles.settingOptionImage} />
      </View>
    </Pressable>
  );
};

export default SettingOption;
