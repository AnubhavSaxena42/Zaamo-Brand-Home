import React from 'react';
import {
  StyleSheet,
  Image,
  TextInput,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import toastService from '../../services/toast-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const BrandGuidelinesScreen = ({navigation, route}) => {
  return (
    <View style={styles.brandGuidelinesContainer}>
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
          }}>
          Brand Guidelines
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
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Influencer Commission(in %)
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            paddingHorizontal: '5%',
            backgroundColor: 'white',
          }}
          placeholder={'13%'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Brand Guidelines
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
          numberOfLines={10}
          textAlignVertical={'top'}
          placeholder={'Enter The guidelines'}
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
            toastService.showToast('Feature in Development', true);
            navigation.navigate('SettingsScreen');
          }}
          style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BrandGuidelinesScreen;

const styles = StyleSheet.create({
  brandGuidelinesContainer: {
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
