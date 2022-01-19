import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import toastService from '../../services/toast-service';
import {useSelector} from 'react-redux';
const CollectionCard = ({
  collection,
  editModalOpen,
  isEditMode,
  setIsEditCollectionId,
  setNewCollectionName,
  setThumbnailUri,
  navigation,
}) => {
  console.log('Collections:', collection);
  console.log(collection.imageUrl);
  const storeUrl = useSelector(state => state.store.storeInfo.storeUrl);
  return (
    <Pressable
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
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
          }}>
          <View
            style={{
              ...styles.editIcon,
              backgroundColor: 'rgba(0,0,0,0)',
              paddingHorizontal: '1%',
              paddingVertical: '4%',
            }}>
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
            <Text
              style={{
                fontSize: 22,
                color: 'white',
                fontWeight: '500',
                textShadowColor: 'rgba(0,0,0,0.3)',
                textShadowRadius: 1,
                textShadowOffset: {width: 1, height: 1.2},
                fontFamily: 'Roboto-Bold',
              }}>
              {collection.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                textShadowColor: 'rgba(0,0,0,0.3)',
                textShadowRadius: 0.1,
                textShadowOffset: {width: 1, height: 1},
                fontFamily: 'Roboto-Bold',
              }}>
              {collection.totalCount && collection.totalCount.toString()}{' '}
              Products
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(storeUrl + '/collection/' + collection.slug);
              toastService.showToast(
                `Collection Url copied to clipboard:"  ${
                  storeUrl + '/collection/' + collection.slug
                }  "`,
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
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}>
            <View
              style={{...styles.editIcon, backgroundColor: 'rgba(0,0,0,0)'}}>
              <Ionicons name="link" size={15} color={'white'} />
            </View>
            <Text style={{color: 'white'}}>Copy Link</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Pressable>
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
    height: 400,
  },
});
