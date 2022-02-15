import React, {useState, useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {BANK_ACCOUNT_CREATE, BRAND_UPI_ID_CREATE} from '../../api/mutations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Animated,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setLoaderStatus} from '../../redux/reducers/appVariablesReducer';
import toastService from '../../services/toast-service';
import {styles} from './styles';

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
    <SafeAreaView style={styles.paymentDetailsContainer}>
      <View style={styles.paymentDetailsSwitchTabContainer}>
        <Image
          source={require('../../assets/images/DashboardEllipse.png')}
          style={styles.backgroundImage}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
        </TouchableOpacity>

        <Text style={styles.paymentDetailsHeaderText}>Payment Details</Text>
      </View>
      <View style={styles.paymentDetailsSwitchTab}>
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
          style={styles.paymentDetailsUPITab}>
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
          style={styles.paymentDetailsBankDetailsTab}>
          <Text style={{color: isViewing === 2 ? 'white' : 'black'}}>
            Bank Details
          </Text>
        </TouchableOpacity>
      </View>
      {isViewing === 1 && (
        <ScrollView style={styles.paymentDetailsUPIFormContainer}>
          <Text style={styles.paymentDetailsLabelText}>
            Account Holder Name
          </Text>
          <TextInput
            value={accountHolderName}
            onChangeText={text => setAccountHolderName(text)}
            style={styles.inputStyle}
            placeholder={'Enter Account Holder Name'}
          />
          {accountHolderNameError && <ErrorMessage />}
          <Text style={styles.paymentDetailsLabelText}>UPI ID</Text>
          <TextInput
            value={upiId}
            onChangeText={text => setUpiId(text)}
            style={styles.inputStyle}
            placeholder={'Enter UPI ID'}
          />
          {upiIdError && <ErrorMessage />}
          <Text style={styles.paymentDetailsLabelText}>Address</Text>
          <TextInput
            value={address}
            onChangeText={text => setAddress(text)}
            style={styles.inputStyle}
            placeholder={'Enter your Address'}
          />
          {addressError && <ErrorMessage />}
          <Text style={styles.paymentDetailsLabelText}>Email</Text>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.inputStyle}
            placeholder={'Enter your Email'}
          />
          {emailError && <ErrorMessage />}
          <Text style={styles.paymentDetailsLabelText}>PAN Number</Text>
          <TextInput
            value={panNumber}
            onChangeText={text => setPanNumber(text)}
            style={styles.inputStyle}
            placeholder={'Enter your PAN Number'}
          />
          {panNumberError && <ErrorMessage />}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                onUpiCreate();
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
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
          <Text style={styles.paymentDetailsLabelText}>
            Account Holder Name
          </Text>
          <TextInput
            value={accountHolderName}
            onChangeText={text => setAccountHolderName(text)}
            style={styles.inputStyle}
            placeholder={'Enter Account Holder Name'}
          />
          {accountHolderNameError && <ErrorMessage />}
          <Text style={styles.paymentDetailsLabelText}>
            Bank Account Number
          </Text>
          <TextInput
            value={bankAccountNumber}
            onChangeText={text => setBankAccountNumber(text)}
            style={styles.inputStyle}
            placeholder={'Enter Bank Account Number'}
          />
          {bankAccountNumberError && <ErrorMessage />}
          <Text style={{color: 'gray', marginVertical: '1%'}}>
            Confirm Account Number
          </Text>
          <TextInput
            value={confirmBankAccountNumber}
            onChangeText={text => setConfirmBankAccountNumber(text)}
            style={styles.inputStyle}
            placeholder={'Re-Enter Bank Account Number'}
          />
          {confirmBankAccountNumberError && <ErrorMessage />}
          <Text style={{color: 'gray', marginVertical: '1%'}}>
            Bank IFSC Code
          </Text>
          <TextInput
            value={bankIfscCode}
            onChangeText={text => setBankIfscCode(text)}
            style={styles.inputStyle}
            placeholder={'Enter Bank IFSC Code'}
          />
          {bankIfscCodeError && <ErrorMessage />}
          <Text style={{color: 'gray', marginVertical: '1%'}}>Address</Text>
          <TextInput
            value={address}
            onChangeText={text => setAddress(text)}
            style={styles.inputStyle}
            placeholder={'Enter Address'}
          />
          {addressError && <ErrorMessage />}
          <Text style={{color: 'gray', marginVertical: '1%'}}>Email</Text>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.inputStyle}
            placeholder={'Enter Your Email'}
          />
          {emailError && <ErrorMessage />}
          <Text style={{color: 'gray', marginVertical: '1%'}}>PAN Number</Text>
          <TextInput
            value={panNumber}
            onChangeText={text => setPanNumber(text)}
            style={styles.inputStyle}
            placeholder={'Enter Your PAN Number'}
          />
          {panNumberError && <ErrorMessage />}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                onBankCreate();
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default PaymentDetailsScreen;
