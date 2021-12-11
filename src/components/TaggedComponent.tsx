import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const TaggedComponent = ({contentId, product, tag, onDelete}) => {
  return (
    <View style={styles.tagContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log('pressed');
          onDelete(contentId, product.id);
        }}>
        <View style={styles.removeIconContainer}>
          <Entypo name="circle-with-cross" size={20} color={'#3B5998'} />
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.tagText}>{tag}</Text>
      </View>
    </View>
  );
};

export default TaggedComponent;

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  removeIconContainer: {
    marginRight: 3,
  },
  tagText: {
    color: '#3B5998',
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
});
