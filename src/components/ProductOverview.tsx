// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import contentService from '../services/content-service';
import {setPosts} from '../redux/reducers/postsReducer';
const windowWidth = Dimensions.get('window').width;
const ProductOverview = ({
  trigger,
  isTrigger,
  product,
  setShowProducts,
  contentType,
  contentId,
  taggedProducts,
}) => {
  const [isTagged, setIsTagged] = useState(false);
  const navigation = useNavigation();
  const posts = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();
  console.log('post', posts[1]);
  console.log('product', product);
  //Have to find a way to populate isTagged
  useEffect(() => {
    taggedProducts.map(taggedProduct => {
      if (taggedProduct.id === product.id) {
        setIsTagged(true);
      }
    });
  }, []);
  const onTagHandler = () => {
    if (isTagged) return;
    //Product Data for the product to be tagged
    const productData = product.variants.map(variant => {
      return {
        product_id: product.id,
        sku_id: variant.id,
        id: contentId,
        content_type: contentType,
        /*id:contentId, Pass from the content post component*/
        //content_type:contentType , Pass from the content post component
      };
    });
    console.log(productData);
    setIsTagged(true);
    contentService
      .tagProduct(productData, 'INWEAVE')
      .then(res => {
        console.log(res);
        //Change post status to tagged in store locally
        const newPosts = posts.map(post => {
          if (post.id === contentId) {
            return {
              ...post,
              tagged: [
                ...post.tagged,
                {id: product.id, name: product.name, slug: product.slug},
              ],
            };
          } else {
            return post;
          }
        });
        dispatch(setPosts(newPosts));
        isTrigger(!trigger);
      })
      .catch(err => {
        setIsTagged(false);
        console.log(err);
      });
  };
  console.log(product);
  return (
    <TouchableOpacity
      style={styles.productOverviewContainer}
      onPress={() => {
        setShowProducts(false);
        navigation.navigate('productScreen', {product});
      }}>
      {/*Image of the product */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            uri: product.thumbnail.url,
          }}
        />
      </View>
      {/*Product Information */}
      <View style={styles.productInfoContainer}>
        <View style={{}}>
          <Text style={styles.productNameText}>{product.name}</Text>
        </View>
        <View>
          <Text style={styles.productLinkText}>
            https://zaamo.co/blue_t_shirt
          </Text>
        </View>
        <View>
          <Text style={styles.priceText}>Rs.{product.price.toString()}</Text>
        </View>
      </View>
      {/*Tag button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={isTagged ? styles.taggedButton : styles.button}
          onPress={onTagHandler}>
          <Text style={styles.buttonText}>{isTagged ? 'Tagged' : 'Tag'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductOverview;

const styles = StyleSheet.create({
  productOverviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Platform.OS === 'web' ? '75%' : '100%',
    height: windowWidth > 500 ? 250 : 120,
    justifyContent: windowWidth > 500 ? 'space-around' : 'space-between',
    backgroundColor: '#f5f5f5',
    marginVertical: 3,
  },
  imageContainer: {
    paddingVertical: 11,
    height: '100%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    //FOR TABLET DIMENSIONS OF IMAGE
    borderRadius: 10,
    overflow: 'hidden',
    maxWidth: windowWidth > 500 ? windowWidth / 3 - 100 : windowWidth / 3 - 30,
  },
  productInfoContainer: {
    justifyContent: 'space-around',
    width: windowWidth / 3,
    paddingLeft: windowWidth > 500 ? 10 : 0,
    height: '100%',
    paddingVertical: '2%',
  },
  productNameText: {
    fontSize: windowWidth > 500 ? 24 : 14,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    fontWeight: 'normal',
  },
  productLinkText: {
    fontSize: windowWidth > 500 ? 22 : 12,
    color: 'rgba(0, 0, 0, 0.5)',
    fontFamily: 'Roboto-Regular',
    fontWeight: 'normal',
  },
  priceText: {
    fontSize: windowWidth > 500 ? 24 : 12,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    fontWeight: 'normal',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    paddingHorizontal: windowWidth > 500 ? 2 : 10,
    paddingVertical: windowWidth > 500 ? 20 : 5,
    width: Platform.OS === 'web' ? '50%' : '40%',
    alignSelf: 'center',
    borderRadius: Platform.OS === 'web' ? 0 : 3,
    backgroundColor: 'black',
  },
  taggedButton: {
    width: Platform.OS === 'web' ? '50%' : '40%',
    paddingHorizontal: windowWidth > 500 ? 2 : 1,
    paddingVertical: windowWidth > 500 ? 20 : 5,
    backgroundColor: '#0e8613',
    borderRadius: Platform.OS === 'web' ? 0 : 3,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: windowWidth > 500 ? 18 : 10,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
  },
});
