import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import toastService from '../../services/toast-service';
const CollectionCard = ({
  collection,
  editModalOpen,
  isEditMode,
  setIsEditCollectionId,
  setNewCollectionName,
  setThumbnailUri,
  navigation,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CollectionViewScreen', {
          collection: collection,
        });
      }}
      style={styles.collectionCardContainer}>
      <ImageBackground
        style={styles.imageStyle}
        source={
          collection.imageUrl !== ''
            ? {uri: collection.imageUrl}
            : require('../../assets/images/smugcat.jpg')
        }>
        <TouchableOpacity
          onPress={() => {
            isEditMode(true);
            editModalOpen(true);
            setIsEditCollectionId(collection.id);
            setNewCollectionName(collection.name);
            setThumbnailUri(collection.imageUrl);
          }}
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
        </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(collection.id);
              toastService.showToast(
                `Collection ID copied to clipboard:"  ${collection.id}  "`,
                true,
              );
            }}
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
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
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
