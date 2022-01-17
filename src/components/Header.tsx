import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Header = ({tag, fontSize, icon, back, navigation, onPress}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={{...styles.headerText, fontSize: fontSize ? fontSize : 28}}>
        {tag ? tag : 'ZAAMO'}
      </Text>
      {icon && (
        <TouchableOpacity
          onPress={onPress}
          style={{position: 'absolute', right: 5}}>
          <Entypo name="plus" size={30} color={'white'} />
        </TouchableOpacity>
      )}
      {back && (
        <TouchableOpacity
          style={{position: 'absolute', left: 10}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.OS === 'web' ? 80 : 60,
    backgroundColor: 'black',
    paddingVertical: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    textAlign: Platform.OS === 'web' ? 'left' : 'center',
    marginLeft: Platform.OS === 'web' ? '2%' : 0,
    fontFamily: 'Roboto-Bold',
    fontSize: Platform.OS === 'web' ? 36 : 28,
  },
});
