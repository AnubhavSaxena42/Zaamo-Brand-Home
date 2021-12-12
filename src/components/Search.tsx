import React from 'react';
import {
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Search = ({placeholder, onSearch, onBackPress}) => {
  return (
    <View style={styles.searchContainer}>
      {Platform.OS === 'web' && (
        <TouchableOpacity onPress={() => onBackPress(false)}>
          <Ionicons name="arrow-back" color="black" size={40} />
        </TouchableOpacity>
      )}
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
    height: Platform.OS === 'web' ? 60 : 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Platform.OS === 'web' ? 30 : 10,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    borderColor: 'gray',
    width: Platform.OS === 'web' ? '60%' : '90%',
    alignSelf: 'center',
  },
  inputContainer: {
    width: '90%',
  },
  input: {
    borderWidth: 0,
    fontSize: Platform.OS === 'web' ? 36 : 16,
    width: '100%',
  },
  iconContainer: {},
});
