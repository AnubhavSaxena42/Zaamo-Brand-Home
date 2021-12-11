// @ts-nocheck
import React, {useState} from 'react';
import {
  StyleSheet,
  Modal,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
//import ImageViewer from 'react-native-image-zoom-viewer';
import contentService from '../services/content-service';
import {useDispatch, useSelector} from 'react-redux';
import {setPosts} from '../redux/reducers/postsReducer';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const ContentOverview = ({post, source}) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const posts = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();
  const images = [
    {
      // Simplest usage.
      //url: post.media_url,

      // width: number
      // height: number
      // Optional, if you know the image size, you can set the optimization performance

      // You can pass props to <Image />.
      props: {
        // headers: ...
        resizeMode: 'cover',
      },
    },
  ];

  const markTrashHandler = () => {
    const trashData = {
      ids: [post.id],
      is_trash: true,
    };
    console.log(trashData);
    contentService
      .markTrash(trashData)
      .then(res => {
        console.log('Trash Data res', res);
        //remove post in store
        const newPosts = posts.filter(storePost => {
          return storePost.id !== post.id;
        });
        dispatch(setPosts(newPosts));
        //re render
      })
      .catch(err => {
        console.log('Trash err', err);
      });
  };

  return (
    <View
      style={{
        ...styles.overviewContainer,
        backgroundColor: source === 'MANUAL_UPLOAD' ? '' : 'white',
      }}>
      <TouchableOpacity
        style={styles.crossContainer}
        onPress={markTrashHandler}>
        <Entypo name="cross" size={25} color="#f24e1e" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowQuickView(true)}>
        <ImageBackground
          source={{
            uri: post.media_url,
          }}
          resizeMode={'cover'}
          style={styles.contentImage}>
          <View style={styles.metricsContainer}>
            <View style={styles.metric}>
              <View style={styles.icon}>
                <Ionicons name="heart" size={28} color="white" />
              </View>
              <View>
                <Text style={styles.value}>{post.likes.toString()}</Text>
              </View>
            </View>
            <View style={styles.metric}>
              <View style={styles.icon}>
                <Foundation name="comments" size={30} color="white" />
              </View>
              <View>
                <Text style={styles.value}>{post.comments.toString()}</Text>
              </View>
            </View>
            {/*<View style={styles.metric}>
              <View style={styles.icon}>
                <FontAwesome5 name="share-square" size={25} color="white" />
              </View>
              <View>
                <Text style={styles.value}>{post.shares.toString()}</Text>
              </View>
            </View>*/}
            <TouchableOpacity onPress={() => setShowQuickView(true)}>
              <View style={styles.quickViewContainer}>
                <View style={styles.icon}>
                  <Ionicons name="eye" size={30} color="white" />
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily: 'Roboto-Black',
                  }}>
                  Quick View
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Quick View Modal */}
          <Modal
            animationType="slide"
            visible={showQuickView}
            onRequestClose={() => {
              setShowQuickView(false);
            }}>
            {/*<ImageViewer
              onClick={() => setShowQuickView(false)}
              imageUrls={images}
            />*/}
          </Modal>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default ContentOverview;

const styles = StyleSheet.create({
  overviewContainer: {
    height: 381,
    width: '100%',
    position: 'relative',
  },
  contentImage: {
    width: '100%',
    height: 400,
  },
  metricsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginLeft: 5,
    marginRight: 10,
  },
  value: {
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Roboto-Black',
  },
  quickViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  crossContainer: {
    elevation: 5,
    zIndex: 10,
    backgroundColor: '#6e6f6c',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
