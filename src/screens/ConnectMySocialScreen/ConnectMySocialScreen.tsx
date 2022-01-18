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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import toastService from '../../services/toast-service';
const windowWidth = Dimensions.get('window').width;
const ConnectMySocialScreen = ({navigation, route}) => {
  return (
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
        <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
          Connect your Social Handles
        </Text>
        <Text style={{marginVertical: '5%', color: 'gray'}}>Instagram</Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            color: 'gray',
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
          placeholder={'@yourinstahandle'}
        />
        <Text style={{color: 'gray', marginVertical: '5%'}}>Youtube</Text>
        <TextInput
          style={{
            color: 'gray',
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
});
