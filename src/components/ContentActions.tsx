// @ts-nocheck
import React, {useState} from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ActionButton from './ActionButton';
import Dropdown from './Dropdown';
import TaggedComponent from './TaggedComponent';
import TagProductsModal from './TagProductsModal';
import TagCollectionsModal from './TagCollectionsModal';
//import GestureRecognizer from 'react-native-swipe-gestures';
import {RootState} from '../redux/store/store';
import {setPosts} from '../redux/reducers/postsReducer';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import {Post} from '../types';
import contentService from '../services/content-service';
export interface ContentActionsProps {
  post: Post;
  contentTypeItems: any;
}
const ContentActions = ({
  post,
  contentTypeItems,
  trigger,
  isTrigger,
  contentType,
  setContentType,
}: ContentActionsProps) => {
  const [showProducts, setShowProducts] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const navigation = useNavigation();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const removeTagHandler = async (contentId, productId) => {
    console.log('called', contentId, productId);
    const untagData = [
      {
        content_id: contentId,
        product_id: productId,
      },
    ];
    contentService
      .untagProduct(untagData)
      .then(res => {
        console.log(res);
        console.log('Product has been untagged');
        //remove product from post in store
        const newPosts = posts.map(post => {
          let flag = 0;
          let newTagged = post.tagged_products;
          if (post.id === contentId)
            newTagged = post.tagged_products.filter(taggedProduct => {
              return taggedProduct.id !== productId;
            });
          const newPost = {
            ...post,
            tagged_products: newTagged,
          };

          return newPost;
        });
        dispatch(setPosts(newPosts));
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.contentActionsContainer}>
      {/*Action buttons and dropdown*/}
      <View style={styles.actionsContainer}>
        {Platform.OS !== 'web' && (
          <Dropdown
            tag={'Content Type'}
            items={contentTypeItems}
            selectedValue={contentType}
            setSelectedValue={setContentType}
            dropDownContainerStyle={{
              width: '25%',
              height: 35,
              backgroundColor: 'white',
              shadowColor: '#000000',
              borderRadius: 3,
              marginTop: 5,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              paddingHorizontal: '1%',
              shadowRadius: 5,
              shadowOpacity: 1.0,
              elevation: 5,
              zIndex: 200,
              position: 'relative',
            }}
            dropDownTextStyle={{
              fontSize: 10,
            }}
            dropDownValuesTextStyle={{
              fontFamily: 'Roboto-Bold',
              marginLeft: 4,
              fontSize: 12,
            }}
            dropDownValuesContainerStyle={{
              width: '110%',
              position: 'absolute',
              top: -269,
              elevation: 1,
              zIndex: 100,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
            }}
          />
        )}
        <ActionButton
          onPress={() => {
            dispatch(setPosts(posts));
            navigation.navigate('addProduct');
          }}
          action="Add Product"
        />
        <ActionButton
          onPress={() => {
            setShowProducts(true);
          }}
          action="Tag Products"
        />
        <ActionButton
          onPress={() => {
            setShowCollections(true);
          }}
          action="Tag Collections"
        />
      </View>
      {/*Tags */}
      <View style={styles.tagsContainer}>
        {post.tagged_products.map(tag => (
          <TaggedComponent
            key={tag.name}
            contentId={post.id}
            product={tag}
            tag={tag.name}
            onDelete={removeTagHandler}
          />
        ))}
      </View>
      {/* Tag Products Modal */}
      {/*<GestureRecognizer
        config={{directionalOffsetThreshold: 30, velocityThreshold: 0.5}}
        onSwipeRight={() => setShowProducts(false)}>*/}
      <Modal
        animationType="fade"
        visible={showProducts}
        onRequestClose={() => {
          setShowProducts(false);
        }}>
        <TagProductsModal
          trigger={trigger}
          isTrigger={isTrigger}
          contentType={contentType}
          taggedProducts={post.tagged_products}
          contentId={post.id}
          setShowProducts={setShowProducts}
        />
      </Modal>
      {/*</GestureRecognizer>*/}
      {/* Tag Collections Modal */}
      {/*<GestureRecognizer
        config={{directionalOffsetThreshold: 30, velocityThreshold: 0.5}}
        onSwipeRight={() => setShowCollections(false)}>*/}
      <Modal
        animationType="slide"
        visible={showCollections}
        onRequestClose={() => {
          setShowCollections(false);
        }}>
        <TagCollectionsModal setShowCollections={setShowCollections} />
      </Modal>
      {/*</GestureRecognizer>*/}
    </View>
  );
};

export default ContentActions;

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 18,
  },
  contentActionsContainer: {
    width: '100%',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
