import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CREATE_SUPPORT_QUERY} from './mutations';
const windowWidth = Dimensions.get('window').width;
const ZaamoSupportScreen = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [supportQueryCreate, {data, error, loading}] = useMutation(
    CREATE_SUPPORT_QUERY,
    {
      variables: {
        email: email,
        message: message,
        mobileNo: '+919599243067',
      },
    },
  );
  const onQueryCreate = () => {
    supportQueryCreate();
  };
  console.log(data, error, loading);
  return (
    <View style={styles.zaamoSupportContainer}>
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
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          numberOfLines={10}
          textAlignVertical={'top'}
          placeholder={'Enter your Message'}
        />
        <TouchableOpacity
          onPress={() => supportQueryCreate()}
          style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
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
