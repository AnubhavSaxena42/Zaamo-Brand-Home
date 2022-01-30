import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {styles} from './styles';
const UpdateCard = () => {
  return (
    <View style={styles.updateCardContainer}>
      <Image
        source={require('../../assets/images/smugcat.jpg')}
        style={styles.avatarImage}
      />
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>
          Levi's has just launched it's new campaign which is booming in the
          industry
        </Text>
        <Text style={styles.notificationTime}>Today at 9:42 AM</Text>
      </View>
    </View>
  );
};

export default UpdateCard;
