import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const InstaNotification = () => {
  return (
    <View style={styles.instaNotificationContainer}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: '5%',
        }}>
        <Image
          style={{width: 50, height: 50, borderRadius: 25}}
          source={require('../../assets/images/smugcat.jpg')}
        />
        <View style={{flex: 1, paddingHorizontal: '5%'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: '2%',
              marginBottom: '1%',
            }}>
            <Text style={{fontFamily: 'Roboto-Black', color: 'black'}}>
              Gia Garg
            </Text>
            <Text
              style={{color: 'rgba(0,0,0,0.3)', fontFamily: 'Roboto-Regular'}}>
              2 hours ago
            </Text>
          </View>
          <Text style={{fontFamily: 'Roboto-Regular'}}>
            Commented "pp" on your "Latest Pastel Nike Shoes For Women"
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text style={styles.customPriceText}>1600</Text>
        <Text style={styles.customPriceText}>1600</Text>
        <Text style={styles.customPriceText}>1600</Text>
        <Text style={styles.customPriceText}>1600</Text>
        <Text style={styles.customPriceText}>Enter the Price</Text>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
          }}>
          <Ionicons name="send" size={20} color={'black'} />
        </View>
      </View>
    </View>
  );
};

export default InstaNotification;

const styles = StyleSheet.create({
  instaNotificationContainer: {
    width: '100%',

    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    paddingHorizontal: '2%',
    paddingVertical: '3%',
  },
  customPriceText: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 3,
    marginBottom: 2,
    borderRadius: 4,
    fontFamily: 'Roboto-Regular',
  },
});
