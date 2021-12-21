// @ts-nocheck
import React, {useState} from 'react';
import Header from '../components/Header';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import Dropdown from '../components/Dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import GestureRecognizer from 'react-native-swipe-gestures';
const AddProductScreen = ({navigation}) => {
  const [brandName, setbrandName] = useState();
  const [contentFormat, setContentFormat] = useState();
  const contentFormatItems = [
    'All',
    'Insta Highlight',
    'Insta Story',
    'Insta Reel',
    'Insta Video',
    'Static Post',
    'Uncategorized',
  ];
  {
    /*<GestureRecognizer
      config={{directionalOffsetThreshold: 30, velocityThreshold: 0.5}}
    onSwipeRight={() => navigation.goBack()}>*/
  }
  return (
    <View style={styles.addProductContainer}>
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.addProductsDropdownContainer}>
        <Dropdown
          tag="Select Brand Name*"
          items={contentFormatItems}
          selectedValue={contentFormat}
          setSelectedValue={setContentFormat}
          dropDownContainerStyle={{zIndex: 500}}
        />
        <Dropdown
          tag="Content Format"
          items={contentFormatItems}
          selectedValue={contentFormat}
          setSelectedValue={setContentFormat}
          dropDownContainerStyle={{}}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('createProduct');
        }}>
        <View style={styles.addFilesContainer}>
          <View style={styles.iconContainer}>
            <AntDesign name="addfile" size={50} color={'#898a8a'} />
          </View>
          <Text style={styles.addTitleText}>Browse your files here....</Text>
          <Text style={styles.addSubtitleText}>Supports all files</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
{
  /*</GestureRecognizer>*/
}
export default AddProductScreen;

const styles = StyleSheet.create({
  addProductContainer: {
    height: '100%',
  },
  addProductsDropdownContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  addFilesContainer: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#b7b9ba',
    paddingHorizontal: '5%',
    paddingVertical: '25%',
    marginTop: Platform.OS === 'web' ? '2%' : '35%',
    width: '80%',
    alignSelf: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  addTitleText: {
    fontSize: 24,
    textAlign: 'center',
  },
  addSubtitleText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
