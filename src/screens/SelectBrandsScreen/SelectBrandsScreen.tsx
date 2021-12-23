//@ts-nocheck
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  View,
} from 'react-native';
import renchon from '../../assets/renchon.png';
import {useQuery, gql} from '@apollo/client';
import axios from 'axios';
import {GET_BRANDS} from './queries';
import Dropdown from '../../components/Dropdown';

const windowHeight = Dimensions.get('window').height;
const SelectBrandsScreen = ({navigation}) => {
  const [brandsItems, setBrandsItems] = useState([]);
  const [brand, setBrand] = useState('');
  const {loading, error, data} = useQuery(GET_BRANDS);
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
    height: '70%',
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

  const formData = new FormData();
  formData.append('user_type', 'BRAND');
  formData.append('image', renchon);
  formData.append('tag_product', 'false');
  formData.append('mapping', '[]');

  const onUpload = () => {
    formData.append('zaamo_id', brand);
    /*axios({
      method: 'post',
      url: 'https://betacontent.zaamo.co/engine/content/upload',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
      */
  };

  const onBrandSelected = () => {
    navigation.navigate('panel', {
      brandId: brand,
    });
  };
  console.log('brands Items:', brandsItems);
  return (
    <View style={styles.selectBrandContainer}>
      <Text
        style={{
          fontSize: 28,
          color: 'black',
          fontWeight: 'bold',
          marginTop: '10%',
        }}>
        Select Brands screen
      </Text>
      <Dropdown
        tag={'Select Brand'}
        items={brandsItems}
        selectedValue={brand}
        setSelectedValue={setBrand}
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
          Platform.OS === 'web' ? webDropdownTextStyle : mobileDropdownTextStyle
        }
        dropDownValuesContainerStyle={
          Platform.OS === 'web'
            ? webDropdownValuesContainerStyle
            : mobileDropdownValuesContainerStyle
        }
      />

      <TouchableOpacity onPress={onUpload} style={styles.nextButtonContainer}>
        <View style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Upload Content</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onBrandSelected}
        style={styles.nextButtonContainer}>
        <View style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectBrandsScreen;

const styles = StyleSheet.create({
  selectBrandContainer: {
    alignItems: 'center',
    height: windowHeight,
    width: '100%',
    backgroundColor: 'white',
  },
  nextButtonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingVertical: '5%',
    marginTop: '1%',
    width: '100%',
  },
  nextButton: {
    backgroundColor: 'black',
    width: '10%',
    padding: '1%',
    marginBottom: '1%',
    borderRadius: 10,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
