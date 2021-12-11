import React from 'react';
import {StyleSheet, View} from 'react-native';
import CollectionOverview from './CollectionOverview';
import Search from './Search';

const TagCollectionsModal = () => {
  return (
    <View style={styles.tagCollectionsContainer}>
      <Search placeholder={'Enter Collection Name'} />
      <CollectionOverview />
      <CollectionOverview />
      <CollectionOverview />
    </View>
  );
};

export default TagCollectionsModal;

const styles = StyleSheet.create({
  tagCollectionsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
});
