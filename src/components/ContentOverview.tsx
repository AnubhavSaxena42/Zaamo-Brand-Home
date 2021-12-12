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
import {Platform} from 'react-native';
import Dropdown from './Dropdown';
const windowWidth = Dimensions.get('window').width;
const ContentOverview = ({
  post,
  source,
  contentType,
  setContentType,
  contentTypeItems,
}) => {
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
                <Ionicons name="heart" size={28} color="rgba(255,0,0,0.6)" />
              </View>
              <View>
                <Text style={styles.value}>{post.likes.toString()}</Text>
              </View>
            </View>
            <View style={styles.metric}>
              <View style={styles.icon}>
                <Foundation name="comments" size={30} color="rgba(0,0,0,0.2)" />
              </View>
              <View>
                <Text style={styles.value}>{post.comments.toString()}</Text>
              </View>
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
          {Platform.OS === 'web' && (
            <View style={styles.webQuickContentContainer}>
              <TouchableOpacity
                onPress={() => setShowQuickView(true)}
                style={styles.webQuickContainer}>
                <Text style={{color: 'white', fontSize: '90%'}}>
                  Quick View
                </Text>
              </TouchableOpacity>
              <Dropdown
                tag={'Content Type'}
                items={contentTypeItems}
                selectedValue={contentType}
                setSelectedValue={setContentType}
                backgroundColorStyle={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  paddingHorizontal: '2%',
                }}
                dropDownContainerStyle={{
                  width: '49.5%',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  elevation: 5,
                  paddingHorizontal: '3%',
                  zIndex: 400,
                }}
                dropDownTextStyle={{
                  color: 'white',
                  fontSize: '90%',
                  alignSelf: 'center',
                }}
                dropDownValuesTextStyle={{
                  marginLeft: 4,
                  fontSize: '90%',
                  color: 'white',
                }}
                dropDownValuesContainerStyle={{
                  top: -400,
                  width: '112%',
                  elevation: 1,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                }}
                webStyle={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}
              />
            </View>
          )}
          {Platform.OS !== 'web' && (
            <TouchableOpacity
              style={styles.quickViewContainer}
              onPress={() => setShowQuickView(true)}>
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
            </TouchableOpacity>
          )}

          {/* Quick View Modal */}
          <Modal
            animationType="none"
            visible={showQuickView}
            onRequestClose={() => {
              setShowQuickView(false);
            }}>
            {/*<ImageViewer
              onClick={() => setShowQuickView(false)}
              imageUrls={images}
            />*/}

            <TouchableOpacity
              onPress={() => {
                setShowQuickView(false);
              }}
              style={{alignItems: 'center'}}>
              <Image
                source={{uri: post.media_url}}
                style={{
                  width: 720,
                  height: 1280,
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </TouchableOpacity>
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
    zIndex: 200,

    position: 'relative',
  },
  contentImage: {
    maxwidth: '100%',
    height: Platform.OS === 'web' ? 400 : '100%',
  },
  //figure out why responsive units failing for web
  metricsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    marginLeft: '2%',
    marginBottom: Platform.OS === 'web' ? '20%' : '10%',
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
    color: 'rgba(0,0,0,0.4)',
    fontFamily: 'Roboto-Black',
  },
  quickViewContainer: {
    position: 'absolute',
    bottom: 15,
    marginLeft: '2%',
    left: 0,
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
  webQuickContentContainer: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    left: 0,
    bottom: 0,
    height: '10%',
  },
  webQuickContainer: {
    width: '49.5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
