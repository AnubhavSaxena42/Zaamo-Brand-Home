import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
const InstaNotification = () => {
  return (
    <View style={styles.instaNotificationContainer}>
      <View style={styles.notificationInfoContainer}>
        <Image
          style={styles.avatarImage}
          source={require('../../assets/images/smugcat.jpg')}
        />
        <View style={styles.notificationInfoSubContainer}>
          <View style={styles.rowOneContainer}>
            <Text style={styles.userNameText}>Gia Garg</Text>
            <Text style={styles.postTimeText}>2 hours ago</Text>
          </View>
          <Text style={{fontFamily: 'Roboto-Regular'}}>
            Commented "pp" on your "Latest Pastel Nike Shoes For Women"
          </Text>
        </View>
      </View>
      <View style={styles.customisedPricingContainer}>
        <Text style={styles.customPriceText}>1600</Text>
        <Text style={styles.customPriceText}>1600</Text>
        <Text style={styles.customPriceText}>1600</Text>
        <Text style={styles.customPriceText}>1600</Text>
        <Text style={styles.customPriceText}>Enter the Price</Text>
        <View style={styles.sendButton}>
          <Ionicons name="send" size={20} color={'black'} />
        </View>
      </View>
    </View>
  );
};

export default InstaNotification;
