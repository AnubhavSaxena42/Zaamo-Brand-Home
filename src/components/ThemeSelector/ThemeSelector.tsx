import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ColorPalette = ({color}) => {
  return (
    <View
      style={{
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: color,
        marginHorizontal: '1%',
      }}></View>
  );
};

const ThemeSelector = ({selectorTag}) => {
  return (
    <View style={styles.themeSelectorContainer}>
      <Text style={{color: 'black', fontSize: 14}}>{selectorTag}</Text>
      <View
        style={{
          marginTop: '2%',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <ColorPalette color="white" />
        <ColorPalette color="black" />
        <ColorPalette color="#e8e8e8" />
        <ColorPalette color="#c4c4c4" />
        <ColorPalette color="#595959" />
        <ColorPalette color="#404040" />
        <ColorPalette color="#fdf3f3" />
      </View>
    </View>
  );
};

export default ThemeSelector;

const styles = StyleSheet.create({
  themeSelectorContainer: {
    width: '100%',
    marginBottom: '10%',
  },
});
