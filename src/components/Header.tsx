import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>ZAAMO</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    backgroundColor: 'black',
    paddingVertical: 5,
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    textAlign: Platform.OS === 'web' ? 'left' : 'center',
    marginLeft: Platform.OS === 'web' ? '2%' : 0,
    fontFamily: 'Merriweather-Regular',
    fontWeight: '400',
    fontSize: 28,
  },
});
