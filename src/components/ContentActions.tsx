import React, {useState} from 'react';
import {StyleSheet, Modal, Text, View, TouchableOpacity} from 'react-native';
import ActionButton from './ActionButton';
import Dropdown from './Dropdown';
import TaggedComponent from './TaggedComponent';
import TagProductsModal from './TagProductsModal';
import TagCollectionsModal from './TagCollectionsModal';
import GestureRecognizer from 'react-native-swipe-gestures';
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
}: ContentActionsProps) => {
  const [showProducts, setShowProducts] = useState(false);
  const [showCollections, setShowCollections] = useState(false);
  const [contentType, setContentType] = useState(null);
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

          const newTagged = post.tagged.filter(taggedProduct => {
            return taggedProduct.id !== productId;
          });
          const newPost = {
            ...post,
            tagged: newTagged,
          };

          return newPost;
        });
        dispatch(setPosts(newPosts));
        //trigger re render
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.contentActionsContainer}>
      {/*Action buttons and dropdown*/}
      <View style={styles.actionsContainer}>
        <Dropdown
          tag={'Content Type'}
          items={contentTypeItems}
          selectedValue={contentType}
          setSelectedValue={setContentType}
          dropDownContainerStyle={{
            width: 100,
            alignSelf: 'center',
            shadowColor: '#000000',
            borderRadius: 5,
            marginTop: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
            elevation: 5,
            zIndex: 200,
          }}
          dropDownSelectContainerStyle={{
            paddingVertical: 8,
            borderWidth: 0,
            borderRadius: 5,
            height: 35,
          }}
          dropDownValuesTextStyle={{
            marginLeft: 4,
            fontSize: 12,
          }}
          dropDownValuesContainerStyle={{
            elevation: 10,
          }}
        />
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
        {post.tagged.map(tag => (
          <TaggedComponent
            contentId={post.id}
            product={tag}
            tag={tag.name}
            onDelete={removeTagHandler}
          />
        ))}
      </View>
      {/* Tag Products Modal */}
      <GestureRecognizer
        config={{directionalOffsetThreshold: 30, velocityThreshold: 0.5}}
        onSwipeRight={() => setShowProducts(false)}>
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
            taggedProducts={post.tagged}
            contentId={post.id}
            setShowProducts={setShowProducts}
          />
        </Modal>
      </GestureRecognizer>
      {/* Tag Collections Modal */}
      <GestureRecognizer
        config={{directionalOffsetThreshold: 30, velocityThreshold: 0.5}}
        onSwipeRight={() => setShowCollections(false)}>
        <Modal
          animationType="slide"
          visible={showCollections}
          onRequestClose={() => {
            setShowCollections(false);
          }}>
          <TagCollectionsModal />
        </Modal>
      </GestureRecognizer>
    </View>
  );
};

export default ContentActions;

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    zIndex: 200,
  },
  contentActionsContainer: {},
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
