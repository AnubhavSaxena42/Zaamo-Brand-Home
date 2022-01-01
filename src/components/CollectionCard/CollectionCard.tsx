import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CollectionCard = ({collection}) => {
  return (
    <View style={styles.collectionCardContainer}>
      <ImageBackground
        style={styles.imageStyle}
        source={
          collection.imageUrl !== ''
            ? {uri: collection.imageUrl}
            : require('../../assets/images/smugcat.jpg')
        }>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingHorizontal: '3%',
            borderRadius: 10,
            position: 'absolute',
            top: 10,
            right: 10,
          }}>
          <View style={{...styles.editIcon, paddingHorizontal: '1%'}}>
            <Ionicons name="pencil" size={15} color={'black'} />
          </View>
          <Text style={{color: 'black'}}>Edit</Text>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'absolute',
            bottom: 10,
            paddingHorizontal: '4%',
          }}>
          <View>
            <Text style={{fontSize: 20, color: 'white', fontWeight: '500'}}>
              {collection.name}
            </Text>
            <Text style={{fontSize: 15, color: 'white'}}>
              {collection.products && collection.products.length.toString()}{' '}
              Products
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              paddingHorizontal: '3%',
              paddingVertical: '2%',
              borderRadius: 15,
            }}>
            <View style={{...styles.editIcon, backgroundColor: 'black'}}>
              <Ionicons name="link" size={15} color={'white'} />
            </View>
            <Text style={{color: 'white'}}>Copy Link</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
  collectionCardContainer: {
    width: '100%',
    marginVertical: '2%',
  },
  editIcon: {
    height: 22,
    width: 22,
    borderRadius: 11,
    marginRight: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageStyle: {
    width: '100%',
    height: 300,
  },
});
