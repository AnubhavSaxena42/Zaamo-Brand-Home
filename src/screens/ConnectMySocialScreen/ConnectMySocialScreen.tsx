import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import toastService from '../../services/toast-service';
const windowWidth = Dimensions.get('window').width;
const ConnectMySocialScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.connectMySocialContainer}>
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
          Connect My Social
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: '5%',
          height: '90%',
          marginTop: '15%',
          width: '100%',
        }}>
        <Text style={{fontSize: 18,marginBottom:'5%', color: 'black', fontWeight: '600'}}>
          Connect your Social Handles
        </Text>
        <Text style={{marginVertical: '1%', color: 'gray'}}>Instagram</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={'@yourinstahandle'}
        />
        <Text style={{color: 'gray', marginVertical: '5%'}}>Youtube</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={'@yourythandle'}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          position: 'absolute',
          bottom: 25,
        }}>
        <TouchableOpacity
          onPress={() => {
            toastService.showToast('Feature in development', true);
            navigation.navigate('SettingsScreen');
          }}
          style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default ConnectMySocialScreen;

const styles = StyleSheet.create({
  connectMySocialContainer: {
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
  },
  inputStyle:{
    width: '100%',
    color: 'black',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: '3%',
    marginBottom:15
    },
});
