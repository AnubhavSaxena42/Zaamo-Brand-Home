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
      <TouchableNativeFeedback
        onPress={() => {
          setIsOpen(!isOpen);
        }}>
        <View
          style={{
            ...styles.dropdownSelectContainer,
            ...dropDownSelectContainerStyle,
          }}>
          <View style={styles.dropdownTag}>
            <Text style={{...styles.dropdownTagText, ...dropDownTextStyle}}>
              {selectedValue ? selectedName.name : tag}
            </Text>
          </View>

          <View style={styles.iconContainer}>
            <Entypo name="triangle-down" size={15} color={'black'} />
          </View>
        </View>
      </TouchableNativeFeedback>
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
                onPress={() => {
                  setSelectedValue(item.id);
                  setIsOpen(false);
                }}>
                <View
                  style={{
                    backgroundColor:
                      item.id === selectedValue ? 'black' : 'white',
                    paddingVertical: '3%',
                    paddingLeft: '2%',
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
                </View>
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
    width: '50%',
  },
  dropdownSelectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    height: 35,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
  },
  dropdownTag: {},
  dropdownTagText: {
    textAlign: 'center',
    fontSize: 10,
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
