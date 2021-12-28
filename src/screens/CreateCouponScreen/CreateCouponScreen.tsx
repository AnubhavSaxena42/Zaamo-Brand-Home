import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  View,
} from 'react-native';
import Checkbox from '../../components/Checkbox';
import Header from '../../components/Header';
const CreateCouponScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.createCouponContainer}>
      <Header tag={'Marketing'} fontSize={22} />
      <View style={{flex: 1, paddingHorizontal: '5%', paddingVertical: '4%'}}>
        <Text style={{fontSize: 28, color: 'black'}}>Create Coupon</Text>
        <Text style={{fontSize: 22, color: 'black', marginTop: '4%'}}>
          Coupon Details
        </Text>
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Select Coupon Type
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Select Coupon Type'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Upper Limit
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Select Upper Limit'}
        />
        <Text
          style={{
            marginTop: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Minimum Order
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%'}}>
            <Text
              style={{
                marginVertical: '5%',
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
              }}>
              Value
            </Text>
            <TextInput
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.3)',
                borderRadius: 4,
                backgroundColor: 'white',
                paddingHorizontal: '5%',
              }}
              placeholder={'Rs.599'}
            />
          </View>
          <View style={{width: '45%'}}>
            <Text
              style={{
                marginVertical: '5%',
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
              }}>
              Quantity
            </Text>
            <TextInput
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.3)',
                borderRadius: 4,
                backgroundColor: 'white',
                paddingHorizontal: '5%',
              }}
              placeholder={'4'}
            />
          </View>
        </View>
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Select a Brand
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Select a Brand'}
        />
        <Text
          style={{
            marginTop: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Date
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: '45%'}}>
            <Text
              style={{
                marginVertical: '5%',
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
              }}>
              Start Date
            </Text>
            <TextInput
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.3)',
                borderRadius: 4,
                backgroundColor: 'white',
                paddingHorizontal: '5%',
              }}
              placeholder={'dd/mm/yy'}
            />
          </View>
          <View style={{width: '45%'}}>
            <Text
              style={{
                marginVertical: '5%',
                fontSize: 16,
                color: 'black',
                fontWeight: '500',
              }}>
              End Date
            </Text>
            <TextInput
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.3)',
                borderRadius: 4,
                backgroundColor: 'white',
                paddingHorizontal: '5%',
              }}
              placeholder={'dd/mm/yy'}
            />
          </View>
        </View>
        {/* CheckBox */}
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Select Influencer Store
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Select Influencer Store'}
        />
        <Text style={{fontSize: 22, color: 'black', marginTop: '4%'}}>
          Coupon Naming
        </Text>
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Coupon Short Name
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Enter Coupon Short Name'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Coupon Title
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Enter Coupon Title'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Coupon Name
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          placeholder={'Enter Coupon Name'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Coupon Details
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          numberOfLines={8}
          textAlignVertical="top"
          placeholder={'Enter Coupon Details'}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('MarketingScreen')}
          style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Create</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateCouponScreen;

const styles = StyleSheet.create({
  createCouponContainer: {
    flex: 1,
  },
  button: {
    height: '3%',
    borderRadius: 5,
    width: '30%',
    alignSelf: 'center',
    marginVertical: '5%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
