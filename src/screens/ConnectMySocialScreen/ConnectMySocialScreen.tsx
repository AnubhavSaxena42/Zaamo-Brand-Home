import React from 'react';
import {
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
import {styles} from './styles';

const ConnectMySocialScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.connectMySocialContainer}>
      <ScrollView
        contentContainerStyle={styles.connectMySocialScrollViewContainer}>
        <View style={styles.connectMySocialHeaderContainer}>
          <Image
            source={require('../../assets/images/DashboardEllipse.png')}
            style={styles.backgroundImage}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Connect My Social</Text>
        </View>
        <View style={styles.connectMySocialFormContainer}>
          <Text style={styles.connectMySocialFormHeading}>
            Connect your Social Handles
          </Text>
          <Text style={styles.labelText}>Instagram</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder={'@yourinstahandle'}
          />
          <Text style={styles.labelText}>Youtube</Text>
          <TextInput style={styles.inputStyle} placeholder={'@yourythandle'} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              toastService.showToast('Feature in development', true);
              navigation.navigate('SettingsScreen');
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConnectMySocialScreen;
