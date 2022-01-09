import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';

const UpdateCard = () => {
  return (
    <View style={styles.updateCardContainer}>
      <Image
        source={require('../../assets/images/smugcat.jpg')}
        style={{height: 60, width: 60, borderRadius: 30}}
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

const styles = StyleSheet.create({
  updateCardContainer: {
    width: '100%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    paddingVertical: '5%',
  },
  notificationContainer: {
    flex: 1,
    paddingLeft: '5%',
  },
  notificationText: {
    marginBottom: '2%',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: 'black',
  },
  notificationTime: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: 'rgba(0,0,0,0.5)',
  },
});
