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
import {styles} from './styles';
const CollectionCard = ({
  collection,
  editModalOpen,
  isEditMode,
  setIsEditCollectionId,
  setNewCollectionName,
  setThumbnailUri,
  navigation,
}) => {
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
          style={styles.editButton}>
          <View style={styles.iconStyle}>
            <Ionicons name="pencil" size={15} color={'black'} />
          </View>
          <Text style={{color: 'black'}}>Edit</Text>
        </TouchableOpacity>
        <View style={styles.collectionInfoContainer}>
          <View>
            <Text style={styles.collectionNameText}>{collection.name}</Text>
            <Text style={styles.productsCountText}>
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
            style={styles.copyLinkButton}>
            <View style={styles.iconStyle}>
              <Ionicons name="link" size={15} color={'white'} />
            </View>
            <Text style={styles.copyLinkText}>Copy Link</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default CollectionCard;
