import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Search = ({placeholder, onSearch}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <TextInput placeholder={placeholder} style={styles.input} />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onSearch}>
          <FontAwesome5 name="search" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    borderColor: 'gray',
    width: '90%',
    alignSelf: 'center',
  },
  inputContainer: {
    width: '90%',
  },
  input: {
    fontSize: 16,
    width: '100%',
  },
  iconContainer: {},
});
