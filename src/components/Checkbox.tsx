import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Checkbox = ({item, items, setItems}) => {
  const setNewItem = () => {
    const newItems = items.map(checkbox => {
      if (checkbox.id === item.id) {
        return {
          name: checkbox.name,
          id: checkbox.id,
          isSelected: !checkbox.isSelected,
        };
      } else {
        return checkbox;
      }
    });

    setItems(newItems);
  };
  return (
    <TouchableOpacity onPress={setNewItem}>
      <View style={styles.checkBoxContainer}>
        <View style={styles.checkContainer}>
          {item.isSelected ? (
            <AntDesign name="check" size={10} color={'black'} />
          ) : (
            <View style={{}}></View>
          )}
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 3,
    height: 25,
    width: 25,
    backgroundColor: 'white',
    padding: '2%',
  },
  labelContainer: {
    marginLeft: 7,
  },
  labelText: {
    fontSize: 16,
  },
});
