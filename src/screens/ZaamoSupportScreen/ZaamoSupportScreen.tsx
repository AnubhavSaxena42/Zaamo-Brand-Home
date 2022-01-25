import {useMutation} from '@apollo/client';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import toastService from '../../services/toast-service';
import {CREATE_SUPPORT_QUERY} from './mutations';
import Ionicons from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const ZaamoSupportScreen = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const mobileNumber = useSelector(state => state.user.mobileNumber);
  const [supportQueryCreate, {data, error, loading}] = useMutation(
    CREATE_SUPPORT_QUERY,
    {
      variables: {
        email: email,
        message: message,
        mobileNo: '91' + mobileNumber,
      },
    },
  );
  const onQueryCreate = () => {
    toastService.showToast('In Development', true);
    navigation.navigate('SettingsScreen');
    //supportQueryCreate();
  };
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  console.log(data, error, loading);
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.zaamoSupportContainer}>
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

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{zIndex: 2, marginTop: '6%', position: 'absolute', left: 10}}>
          <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
        </TouchableOpacity>

        <Text
          style={{
            color: 'white',
            zIndex: 2,
            marginTop: '7%',
            fontSize: 22,
            paddingHorizontal: '10%',
            textAlign: 'center',
            fontFamily: 'Roboto-Bold',
          }}>
          We'd Love to hear from you!
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: '5%',
          height: '90%',
          marginTop: '15%',
          width: '100%',
        }}>
        <Text
          style={{textAlign: 'center', fontSize: 20, color: 'rgba(0,0,0,0.5)'}}>
          Get In touch
        </Text>
        <View
          style={{
            width: '10%',
            backgroundColor: 'gray',
            height: 3,
            alignSelf: 'center',
            marginBottom: '8%',
          }}
        />
        <Text style={{textAlign: 'center', fontSize: 16, color: 'black'}}>
          Name
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            color: 'rgba(0,0,0,0.6)',
            marginBottom: '5%',
          }}>
          Rachit Juneja
        </Text>
        <Text style={{textAlign: 'center', fontSize: 16, color: 'black'}}>
          Phone
        </Text>
        <Text
          style={{textAlign: 'center', fontSize: 14, color: 'rgba(0,0,0,0.6)'}}>
          +91 1234567890
        </Text>
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Your Email
        </Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            color: 'gray',
            paddingHorizontal: '5%',
            backgroundColor: 'white',
          }}
          placeholder={'Enter Your Email'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Your Message
        </Text>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={{
            width: '100%',
            borderWidth: 1,
            color: 'gray',
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          numberOfLines={10}
          textAlignVertical={'top'}
          placeholder={'Enter your Message'}
        />
        <TouchableOpacity onPress={() => onQueryCreate()} style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ZaamoSupportScreen;

const styles = StyleSheet.create({
  zaamoSupportContainer: {
    flex: 1,
  },
  button: {
    marginTop: '5%',
    height: 35,
    borderRadius: 10,
    width: '25%',
    alignSelf: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
