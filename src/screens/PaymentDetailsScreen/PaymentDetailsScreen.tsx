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
  Animated,
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
  const [accountHolderNameError, setAccountHolderNameError] = useState(false);
  const [upiIdError, setUpiIdError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [panNumberError, setPanNumberError] = useState(false);
  const [bankAccountNumberError, setBankAccountNumberError] = useState(false);
  const [confirmBankAccountNumberError, setConfirmBankAccountNumberError] =
    useState(false);
  const [bankIfscCodeError, setBankIfscCodeError] = useState(false);
  const brandId = useSelector(state => {
    if (
      state.user.authorisedBrands &&
      state.user.authorisedBrands.length !== 0
    ) {
      return state.user.authorisedBrands[0].id;
    } else {
      return null;
    }
  });
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
  useEffect(() => {
    if (bankResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  }, [bankResponse.loading]);
  useEffect(() => {
    if (upiResponse.loading) dispatch(setLoaderStatus(true));
    else dispatch(setLoaderStatus(false));
  });
  const onBankCreate = () => {
    let flag = 0;
    if (!accountHolderName || accountHolderName === '') {
      flag++;
      setAccountHolderNameError(true);
    }
    if (!bankAccountNumber || bankAccountNumber === '') {
      flag++;
      setBankAccountNumberError(true);
    }
    if (!confirmBankAccountNumber || confirmBankAccountNumber === '') {
      flag++;
      setConfirmBankAccountNumber(true);
    }
    if (!bankIfscCode || bankIfscCode === '') {
      flag++;
      setBankIfscCodeError(true);
    }
    if (!address || address === '') {
      flag++;
      setAddressError(true);
    }
    if (!email || email === '') {
      flag++;
      setEmailError(true);
    }
    if (!panNumber || panNumber === '') {
      flag++;
      setPanNumberError(true);
    }
    if (flag > 0) return;
    bankAccountCreate();
  };
  const onUpiCreate = () => {
    let flag = 0;
    if (!accountHolderName || accountHolderName === '') {
      flag++;
      setAccountHolderNameError(true);
    }
    if (!upiId || upiId === '') {
      flag++;
      setUpiIdError(true);
    }
    if (!address || address === '') {
      flag++;
      setAddressError(true);
    }
    if (!email || email === '') {
      flag++;
      setEmailError(true);
    }
    if (!panNumber || panNumber === '') {
      flag++;
      setPanNumberError(true);
    }
    if (flag > 0) return;
    brandUpiIdCreate();
  };
  useEffect(() => {
    if (bankResponse.data) {
      if (bankResponse.data.bankAccountCreate.BankAccount.acNumber) {
        toastService.showToast(
          `Bank Account Added:${bankResponse.data.bankAccountCreate.BankAccount.acNumber}`,
          true,
        );
        navigation.navigate('SettingsScreen');
      }
    }
  }, [bankResponse.data]);
  useEffect(() => {
    if (upiResponse.data) {
      if (upiResponse.data.brandUpiIdCreate.BrandUpiId.upiId) {
        toastService.showToast(
          `UPI Id added: ${upiResponse.data.brandUpiIdCreate.BrandUpiId.upiId}`,
          true,
        );
        navigation.navigate('SettingsScreen');
      }
    }
  }, [upiResponse.data]);
  const ErrorMessage = ({message}) => {
    return (
      <View style={styles.errorMessageContainer}>
        <Text style={styles.errorMessageText}>
          {message ? message : 'This Field is required*'}
        </Text>
      </View>
    );
  };
  const [xTabOne, setXTabOne] = useState(0);
  const [xTabTwo, setXTabTwo] = useState(0);
  const [translateX, setTranslateX] = useState(new Animated.Value(0));
  const handleSlide = type => {
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
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
          position: 'relative',
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            width: '50%',
            height: '100%',
            top: 0,
            left: 0,
            borderRadius: 5,
            backgroundColor: 'rgba(0,0,0,1)',
            transform: [{translateX}],
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setIsViewing(1);
            handleSlide(xTabOne);
          }}
          onLayout={event => setXTabOne(event.nativeEvent.layout.x)}
          style={{
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
          onPress={() => {
            setIsViewing(2);
            handleSlide(xTabTwo);
          }}
          onLayout={event => setXTabTwo(event.nativeEvent.layout.x)}
          style={{
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Enter Account Holder Name'}
          />
          {accountHolderNameError && <ErrorMessage />}
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Enter UPI ID'}
          />
          {upiIdError && <ErrorMessage />}
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Enter your Address'}
          />
          {addressError && <ErrorMessage />}
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Enter your Email'}
          />
          {emailError && <ErrorMessage />}
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Enter your PAN Number'}
          />
          {panNumberError && <ErrorMessage />}
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Enter Account Holder Name'}
          />
          {accountHolderNameError && <ErrorMessage />}
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Enter Bank Account Number'}
          />
          {bankAccountNumberError && <ErrorMessage />}
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Re-Enter Bank Account Number'}
          />
          {confirmBankAccountNumberError && <ErrorMessage />}
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Enter Bank IFSC Code'}
          />
          {bankIfscCodeError && <ErrorMessage />}
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Enter Address'}
          />
          {addressError && <ErrorMessage />}
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Enter Your Email'}
          />
          {emailError && <ErrorMessage />}
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}
            placeholder={'Enter Your PAN Number'}
          />
          {panNumberError && <ErrorMessage />}
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
  errorMessageContainer: {
    marginTop: '1%',
  },
  errorMessageText: {
    fontSize: 12,
    color: 'red',
  },
});
