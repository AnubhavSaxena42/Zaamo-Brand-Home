import React, {useState, useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {BANK_ACCOUNT_CREATE, BRAND_UPI_ID_CREATE} from './mutations';
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
import {useSelector, useDispatch} from 'react-redux';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
const windowWidth = Dimensions.get('window').width;
const PaymentDetailsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isViewing, setIsViewing] = useState(1);
  const [accountHolderName, setAccountHolderName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [confirmBankAccountNumber, setConfirmBankAccountNumber] = useState('');
  const [bankIfscCode, setBankIfscCode] = useState('');
  const brandId = useSelector(state => state.user.authorisedBrands[0].id);
  const [brandUpiIdCreate, upiResponse] = useMutation(BRAND_UPI_ID_CREATE, {
    variables: {
      brand: brandId,
      upiId: upiId,
    },
  });
  const [bankAccountCreate, bankResponse] = useMutation(BANK_ACCOUNT_CREATE, {
    variables: {
      brand: brandId,
      acName: accountHolderName,
      acBankName: accountHolderName,
      acNumber: bankAccountNumber,
      acIfscCode: bankIfscCode,
      acBankBranch: address,
    },
  });

  const onBankCreate = () => {
    console.log('BANK ACCOUNT CREATE CALLED');
    dispatch(setLoaderStatus(true));
    bankAccountCreate();
  };
  const onUpiCreate = () => {
    dispatch(setLoaderStatus(true));
    console.log('UPI CREATE CALLED');
    brandUpiIdCreate();
  };
  useEffect(() => {
    if (bankResponse.data) {
      if (bankResponse.data.bankAccountCreate.BankAccount.acNumber) {
        dispatch(setLoaderStatus(false));
        toastService.showToast(
          `Bank Account Added:${bankResponse.data.bankAccountCreate.BankAccount.acNumber}`,
          true,
        );
        navigation.navigate('SettingsScreen');
      }
      dispatch(setLoaderStatus(false));
    }
  }, [bankResponse.data]);
  useEffect(() => {
    console.log(upiResponse);
    if (upiResponse.data) {
      if (upiResponse.data.brandUpiIdCreate.BrandUpiId.upiId) {
        dispatch(setLoaderStatus(false));
        toastService.showToast(
          `UPI Id added: ${upiResponse.data.brandUpiIdCreate.BrandUpiId.upiId}`,
          true,
        );
        navigation.navigate('SettingsScreen');
      }
      dispatch(setLoaderStatus(false));
    }
  }, [upiResponse.data]);
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
          height: 40,
          borderRadius: 5,
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
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
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
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
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
            value={accountHolderName}
            onChangeText={text => setAccountHolderName(text)}
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
            value={upiId}
            onChangeText={text => setUpiId(text)}
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
            value={address}
            onChangeText={text => setAddress(text)}
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
            value={email}
            onChangeText={text => setEmail(text)}
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
            value={panNumber}
            onChangeText={text => setPanNumber(text)}
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
              onPress={() => {
                onUpiCreate();
              }}
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
            value={accountHolderName}
            onChangeText={text => setAccountHolderName(text)}
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
            value={bankAccountNumber}
            onChangeText={text => setBankAccountNumber(text)}
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
            value={confirmBankAccountNumber}
            onChangeText={text => setConfirmBankAccountNumber(text)}
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
            value={bankIfscCode}
            onChangeText={text => setBankIfscCode(text)}
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
            value={address}
            onChangeText={text => setAddress(text)}
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
            value={email}
            onChangeText={text => setEmail(text)}
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
            value={panNumber}
            onChangeText={text => setPanNumber(text)}
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
              onPress={() => {
                onBankCreate();
              }}
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
