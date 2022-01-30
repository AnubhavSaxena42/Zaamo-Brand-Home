import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import InstaNotification from '../../components/InstaNotification/InstaNotification';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';
const InstaWorldScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.instaWorldContainer}>
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
        <Text style={styles.headerText}>Insta World</Text>
        <Text style={styles.headerSubText}>
          Send your customers your customised price without letting your
          competitors know
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.notificationsContainer}>
        <InstaNotification />
        <InstaNotification />
        <InstaNotification />
        <InstaNotification />
        <InstaNotification />
        <InstaNotification />
        <InstaNotification />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InstaWorldScreen;
