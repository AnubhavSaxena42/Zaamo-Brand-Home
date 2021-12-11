import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const Dropdown = ({
  tag,
  items,
  selectedValue,
  setSelectedValue,
  dropDownContainerStyle,
  dropDownTextStyle,
  dropDownSelectContainerStyle,
  dropDownValuesContainerStyle,
  dropDownValuesTextStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedName = items.find(item => item.id === selectedValue);

  return (
    <View style={{...styles.dropdownContainer, ...dropDownContainerStyle}}>
      <TouchableOpacity
        style={{
          height: '100%',
          width: '100%',
          paddingHorizontal: '2%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => {
          setIsOpen(!isOpen);
        }}>
        <Text style={{...styles.dropdownTagText, ...dropDownTextStyle}}>
          {selectedValue ? selectedName.name : tag}
        </Text>
        <View style={styles.iconContainer}>
          <Entypo name="triangle-down" size={15} color={'black'} />
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            ...styles.dropdownValuesContainer,
            ...dropDownValuesContainerStyle,
          }}>
          {items.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  backgroundColor:
                    item.id === selectedValue ? 'black' : 'white',
                  paddingVertical: '3%',
                  paddingLeft: '2%',
                }}
                onPress={() => {
                  setSelectedValue(item.id);
                  setIsOpen(false);
                }}>
                <Text
                  style={{
                    color:
                      item.id === selectedValue
                        ? 'white'
                        : 'rgba(0, 0, 0, 0.75)',
                    ...dropDownValuesTextStyle,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    zIndex: 400,
    elevation: 20,
    width: 500,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  dropdownTag: {},
  dropdownTagText: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Roboto-Black',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  iconContainer: {},
  dropdownValuesContainer: {
    position: 'absolute',
    top: 30,
    backgroundColor: 'white',
    width: '99%',
  },
});
