import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ActionButton = ({action, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionButtonContainer}>
      <View style={styles.actionButtonIcon}>
        <AntDesign name="plus" size={10} color={'black'} />
      </View>
      <View>
        <Text style={styles.actionText}>{action}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  actionButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 35,
    width: '25%',
    shadowColor: '#000000',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5,
    marginBottom: 5,
    marginTop: 10,
  },
  actionButtonIcon: {},
  actionText: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: '500',
    fontSize: 10,
    fontFamily: 'Roboto-Black',
    textAlign: 'center',
  },
});
