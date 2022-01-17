import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';

const UpdateCard = () => {
  return (
    <View style={styles.updateCardContainer}>
      <Image
        source={require('../../assets/images/smugcat.jpg')}
        style={{
          alignSelf: 'flex-start',
          height: 70,
          width: 70,
          borderRadius: 35,
        }}
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
    paddingHorizontal: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
  notificationContainer: {
    flex: 1,
    paddingLeft: '5%',
  },
  notificationText: {
    marginBottom: '2%',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: 'black',
  },
  notificationTime: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: 'rgba(0,0,0,0.5)',
  },
});
