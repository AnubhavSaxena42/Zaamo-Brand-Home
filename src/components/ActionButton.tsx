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
    height: 30,
    width: '31%',
    shadowColor: '#000000',
    borderRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.7,
    elevation: 5,
    marginBottom: 5,
    marginTop: 10,
  },
  actionButtonIcon: {},
  actionText: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontWeight: '500',
    fontSize: 12,
    fontFamily: 'Roboto-Black',
    textAlign: 'center',
  },
});
