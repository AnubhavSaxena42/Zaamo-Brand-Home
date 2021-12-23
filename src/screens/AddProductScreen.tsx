// @ts-nocheck
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import Dropdown from '../components/Dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useQuery} from '@apollo/client';
import {GET_BRANDS} from './SelectBrandsScreen/queries';
import contentService from '../services/content-service';
//import GestureRecognizer from 'react-native-swipe-gestures';
const AddProductScreen = ({navigation}) => {
  const [brandName, setBrandName] = useState();
  const [contentFormat, setContentFormat] = useState();
  const [brandsItems, setBrandsItems] = useState([]);
  const [contentFormatItems, setContentFormatItems] = useState([]);

  const {loading, error, data} = useQuery(GET_BRANDS);
  const setFilters = async () => {
    contentService
      .getFilters()
      .then(res => {
        const {content_source, content_format, content_type} = res;
        setContentFormatItems(content_format);
        setContentFormat('INSTA_VIDEO');
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    setFilters();
  }, []);
  useEffect(() => {
    if (data) {
      const newBrandsItems = data.brands.edges.map(brandItem => {
        return {
          name: brandItem.node.brandName,
          id: brandItem.node.id,
        };
      });
      setBrandsItems(newBrandsItems);
    }
  }, [data]);
  const webDropdownStyle = {
    height: '5%',
    width: '15%',
    marginLeft: '0%',
    borderRadius: 5,
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 5,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    paddingVertical: 15,
    shadowOpacity: 1.0,
    elevation: 2,
    zIndex: 200,
  };

  const mobileDropdownStyle = {
    height: '140%',
    width: '45%',
    borderRadius: 5,
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 5,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1.0,
    elevation: 5,
    zIndex: 200,
  };
  const mobileDropdownValuesContainerStyle = {
    top: 33,
    width: '105%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  };
  const webDropdownValuesContainerStyle = {
    top: 18,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  };
  const mobileDropdownValuesTextStyle = {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginVertical: 2,
    marginLeft: 10,
  };
  const webDropdownValuesTextStyle = {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginVertical: 5,
    marginLeft: 10,
  };
  const mobileDropdownTextStyle = {
    fontSize: 14,
    fontFamily: 'Open-Sans',
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.75)',
  };
  const webDropdownTextStyle = {
    fontSize: 16,
    fontFamily: 'Open-Sans',
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.75)',
  };

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
          items={brandsItems}
          selectedValue={brandName}
          setSelectedValue={setBrandName}
          down
          iconColor={'black'}
          dropDownContainerStyle={
            Platform.OS === 'web' ? webDropdownStyle : mobileDropdownStyle
          }
          dropDownValuesTextStyle={
            Platform.OS === 'web'
              ? webDropdownValuesTextStyle
              : mobileDropdownValuesTextStyle
          }
          dropDownTextStyle={
            Platform.OS === 'web'
              ? webDropdownTextStyle
              : mobileDropdownTextStyle
          }
          dropDownValuesContainerStyle={
            Platform.OS === 'web'
              ? webDropdownValuesContainerStyle
              : mobileDropdownValuesContainerStyle
          }
        />
        <Dropdown
          tag={'Content Format'}
          items={contentFormatItems}
          selectedValue={contentFormat}
          setSelectedValue={setContentFormat}
          down
          iconColor={'black'}
          dropDownContainerStyle={
            Platform.OS === 'web' ? webDropdownStyle : mobileDropdownStyle
          }
          dropDownValuesTextStyle={
            Platform.OS === 'web'
              ? webDropdownValuesTextStyle
              : mobileDropdownValuesTextStyle
          }
          dropDownTextStyle={
            Platform.OS === 'web'
              ? webDropdownTextStyle
              : mobileDropdownTextStyle
          }
          dropDownValuesContainerStyle={
            Platform.OS === 'web'
              ? webDropdownValuesContainerStyle
              : mobileDropdownValuesContainerStyle
          }
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          //navigation.navigate('createProduct');
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
    justifyContent: 'space-around',
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
