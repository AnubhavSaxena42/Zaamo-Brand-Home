import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const PaymentDetailsScreen = ({navigation, route}) => {
  const [isViewing, setIsViewing] = useState(1);
  return (
    <View style={styles.paymentDetailsContainer}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/DashboardEllipse.png')}
          style={{
            height: 400,
            width: windowWidth,
            zIndex: 1,
            position: 'absolute',
            top: -300,
          }}
        />
        <Text
          style={{
            color: 'white',
            zIndex: 2,
            marginTop: '7%',
            fontSize: 22,
            paddingHorizontal: '10%',
            textAlign: 'center',
          }}>
          Payment Details
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          height: '5%',
          borderRadius: 20,
          marginTop: '15%',
          flexDirection: 'row',
          alignSelf: 'center',
          marginBottom: '3%',
        }}>
        <TouchableOpacity
          onPress={() => setIsViewing(1)}
          style={{
            backgroundColor: isViewing === 1 ? 'black' : 'white',
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: isViewing === 1 ? 'white' : 'black'}}>
            UPI ID
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsViewing(2)}
          style={{
            backgroundColor: isViewing === 2 ? 'black' : 'white',
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: isViewing === 2 ? 'white' : 'black'}}>
            Bank Details
          </Text>
        </TouchableOpacity>
      </View>
      {isViewing === 1 && (
        <ScrollView
          style={{
            paddingHorizontal: '5%',
            height: '100%',
            width: '100%',
          }}>
          <Text style={{marginVertical: '5%'}}>Account Holder Name</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              paddingHorizontal: '5%',
              backgroundColor: 'white',
            }}
            placeholder={'Enter Account Holder Name'}
          />
          <Text style={{marginVertical: '5%'}}>UPI ID</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}
            placeholder={'Enter UPI ID'}
          />
          <Text style={{marginVertical: '5%'}}>Address</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}
            placeholder={'Enter your Address'}
          />
          <Text style={{marginVertical: '5%'}}>Email</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}
            placeholder={'Enter your Email'}
          />
          <Text style={{marginVertical: '5%'}}>PAN Number</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}
            placeholder={'Enter your PAN Number'}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}
              style={styles.button}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      {isViewing === 2 && (
        <ScrollView
          style={{
            paddingHorizontal: '5%',
            height: '100%',
            width: '100%',
          }}>
          <Text style={{marginVertical: '5%'}}>Account Holder Name</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              paddingHorizontal: '5%',
              backgroundColor: 'white',
            }}
            placeholder={'Enter Account Holder Name'}
          />
          <Text style={{marginVertical: '5%'}}>Bank Account Number</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}
            placeholder={'Enter Bank Account Number'}
          />
          <Text style={{marginVertical: '5%'}}>Confirm Account Number</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}
            placeholder={'Re-Enter Bank Account Number'}
          />
          <Text style={{marginVertical: '5%'}}>Bank IFSC Code</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}
            placeholder={'Enter Bank IFSC Code'}
          />
          <Text style={{marginVertical: '5%'}}>Address</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}
            placeholder={'Enter Address'}
          />
          <Text style={{marginVertical: '5%'}}>Email</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}
            placeholder={'Enter Your Email'}
          />
          <Text style={{marginVertical: '5%'}}>PAN Number</Text>
          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
            }}
            placeholder={'Enter Your PAN Number'}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}
              style={styles.button}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default PaymentDetailsScreen;

const styles = StyleSheet.create({
  paymentDetailsContainer: {
    flex: 1,
  },

  button: {
    marginBottom: '10%',
    height: 35,
    borderRadius: 10,
    marginTop: '10%',
    width: '25%',
    alignSelf: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
