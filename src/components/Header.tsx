import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
    height: 50,

    backgroundColor: 'black',
    paddingVertical: 5,
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Merriweather-Regular',
    fontWeight: '400',
    fontSize: 28,
  },
});
