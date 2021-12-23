import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Header = ({showBackButton, navigation}) => {
  return (
    <View style={styles.headerContainer}>
      {Platform.OS === 'web' && showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={40} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>ZAAMO</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.OS === 'web' ? 80 : 60,
    backgroundColor: 'black',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: '1%',
  },
  headerText: {
    color: 'white',
    textAlign: Platform.OS === 'web' ? 'left' : 'center',
    marginLeft: Platform.OS === 'web' ? '2%' : 0,
    fontFamily: 'Merriweather-Regular',
    fontWeight: '400',
    fontSize: Platform.OS === 'web' ? 36 : 28,
  },
});
