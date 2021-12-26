import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  Text,
  View,
  ScrollView,
} from 'react-native';
import InstaNotification from '../../components/InstaNotification/InstaNotification';
const windowWidth = Dimensions.get('window').width;
const InstaWorldScreen = () => {
  return (
    <View style={styles.instaWorldContainer}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/DashboardEllipse.png')}
          style={{
            height: 400,
            width: windowWidth,
            zIndex: 1,
            position: 'absolute',
            top: -275,
          }}
        />
        <Text
          style={{
            color: 'white',
            zIndex: 2,
            marginTop: '5%',
            fontSize: 22,
            paddingHorizontal: '10%',
            textAlign: 'center',
          }}>
          Insta World
        </Text>
        <Text
          style={{
            color: 'white',
            zIndex: 2,
            marginTop: '2%',
            fontSize: 16,
            paddingHorizontal: '10%',
            textAlign: 'center',
          }}>
          Send your customers your customised price without letting your
          competitors know
        </Text>
      </View>
      <ScrollView contentContainerStyle={{marginTop: '5%', paddingBottom: 15}}>
        <InstaNotification />
        <InstaNotification />
        <InstaNotification />
        <InstaNotification />
        <InstaNotification />
        <InstaNotification />
        <InstaNotification />
      </ScrollView>
    </View>
  );
};

export default InstaWorldScreen;

const styles = StyleSheet.create({
  instaWorldContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
});
