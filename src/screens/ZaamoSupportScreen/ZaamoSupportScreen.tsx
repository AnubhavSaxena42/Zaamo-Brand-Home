import {useMutation} from '@apollo/client';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import toastService from '../../services/toast-service';
import {CREATE_SUPPORT_QUERY} from '../../api/mutations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

const ZaamoSupportScreen = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const brandName = useSelector(state => state.user.brandContactName);
  const brandContactEmail = useSelector(state => state.user.brandEmail);
  const mobileNumber = useSelector(state => state.user.mobileNumber);
  const [supportQueryCreate, {data, error, loading}] = useMutation(
    CREATE_SUPPORT_QUERY,
    {
      variables: {
        email: email,
        message: message,
        mobileNo: '+91' + mobileNumber,
      },
    },
  );
  const onQueryCreate = () => {
    if (!email || email === '' || !message || message === '') {
      toastService.showToast(
        'Please fill out the details before creating a support query request',
        true,
      );
      return;
    }
    supportQueryCreate();
  };
  useEffect(() => {
    if (data) {
      if (data.supportQueryCreate.SupportQuery) {
        toastService.showToast('Support Query Created', true);
        navigation.goBack();
      }
    }
  }, [data]);
  console.log(data, error, loading);
  return (
    <SafeAreaView style={styles.zaamoSupportContainer}>
      <ScrollView contentContainerStyle={styles.zaamoSupportContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/images/DashboardEllipse.png')}
            style={styles.backgroundImage}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
          </TouchableOpacity>
          <Text style={styles.headerText}>We'd Love to hear from you!</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.subHeaderText}>Get In touch</Text>
          <View style={styles.subHeaderUnderline} />
          <Text style={styles.subHeaderLabel}>Name</Text>
          <Text style={styles.subHeaderValue}>
            {brandName && brandName !== '' ? brandName : ''}
          </Text>
          <Text style={styles.subHeaderLabel}>Email</Text>
          <Text style={styles.subHeaderValue}>
            {brandContactEmail && brandContactEmail !== ''
              ? brandContactEmail
              : ''}
          </Text>
          <Text style={styles.inputLabel}>Your Email</Text>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.inputStyle}
            placeholder={'Enter Your Email'}
          />
          <Text style={styles.inputLabel}>Your Message</Text>
          <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            style={styles.inputStyle}
            multiline={true}
            textAlignVertical={'top'}
            placeholder={'Enter your Message'}
          />
          <TouchableOpacity
            onPress={() => onQueryCreate()}
            style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ZaamoSupportScreen;
