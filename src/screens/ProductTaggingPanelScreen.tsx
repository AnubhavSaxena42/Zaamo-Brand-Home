// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Platform,
  Dimensions,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import ContentPost from '../components/ContentPost';
import Dropdown from '../components/Dropdown';
import Header from '../components/Header';
import {RootState} from '../redux/store/store';
import {useSelector, useDispatch} from 'react-redux';
import contentService from '../services/content-service';
import {setPosts} from '../redux/reducers/postsReducer';
import {setPageInfo, setProducts} from '../redux/reducers/productsReducer';
const ProductTaggingPanelScreen = ({navigation, route}) => {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const [trigger, isTrigger] = useState(true);
  const [contentSourceItems, setContentSourceItems] = useState([]);
  const [contentFormatItems, setContentFormatItems] = useState([]);
  const [contentSource, setContentSource] = useState(null);
  const [contentFormat, setContentFormat] = useState(null);
  const [contentLimit, setContentLimit] = useState(12);
  const [contentOffset, setContentOffset] = useState(0);
  const [contentTypeItems, setContentTypeItems] = useState([]);
  const [isActivityIndicator, setIsActivityIndicator] = useState(false);
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  //Set number of columns for Web,Tablet and Mobile
  let numberOfColumns;
  if (Platform.OS === 'web') {
    numberOfColumns = 4;
  } else {
    numberOfColumns = windowWidth > 500 ? 2 : 1;
  }
  const setFilters = async () => {
    contentService
      .getFilters()
      .then(res => {
        const {content_source, content_format, content_type} = res;
        setContentSourceItems(content_source);
        setContentFormatItems(content_format);
        setContentTypeItems(content_type);
      })
      .catch(err => console.log(err));
  };
  console.log('platform', Platform.OS);
  //To be updated, implement caching of data in store and add another useEffect for pagination parameters
  const fetchContent = async () => {
    setIsActivityIndicator(true);
    contentService
      .getContent(contentSource, contentFormat, contentLimit, 0)
      .then(res => {
        console.log('We have new data!');
        console.log(res);
        let {data} = res;
        setIsActivityIndicator(false);
        dispatch(setPosts(data));
      })
      .catch(err => console.log(err));
  };

  const fetchProducts = async () => {
    console.log('calling products fetch');
    contentService
      .getProducts('QnJhbmQ6MQ==', 10, 'WyJibHVlLWZsb3JhbC1zaG9ydC1kcmVzcyJd')
      .then(res => {
        console.log(res);
        let {data} = res;
        console.log('products');
        console.log(data);
        let {products, pageInfo} = data;
        console.log(products);
        console.log(pageInfo);
        dispatch(setProducts(products));
        dispatch(setPageInfo(pageInfo));
      })
      .catch(err => {
        console.log('products fetch error');
        console.log(err);
      });
  };
  useEffect(() => {
    setFilters();
    fetchProducts();
  }, []);
  useEffect(() => {
    fetchContent();
  }, [contentSource, contentFormat, contentLimit]);

  return (
    <View style={styles.taggingPanelContainer}>
      <Header />
      {/*Filters for posts */}
      <View style={styles.filtersContainer}>
        {/*Dropdown Style Objects OS Specific */}
        <Dropdown
          tag="Content Source"
          items={contentSourceItems}
          selectedValue={contentSource}
          setSelectedValue={setContentSource}
          iconColor={'black'}
          dropDownContainerStyle={{
            height: '30%',
            width: '10%',
            marginLeft: '2%',
            borderRadius: 5,
            alignItems: 'center',
            borderColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 5,
            borderWidth: 1,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 2,
            paddingVertical: 15,
            shadowOpacity: 1.0,
            elevation: 5,
            zIndex: 200,
          }}
          dropDownTextStyle={{
            fontSize: 14,
            fontFamily: 'Open-Sans',
            fontWeight: '300',
            color: 'rgba(0, 0, 0, 0.75',
          }}
          dropDownValuesTextStyle={{
            fontSize: 14,
            fontFamily: 'Roboto-Regular',
            marginVertical: 2,
            marginLeft: 10,
          }}
          dropDownValuesContainerStyle={{
            top: 33,
          }}
        />
        <Dropdown
          tag="Content Format"
          items={contentFormatItems}
          selectedValue={contentFormat}
          iconColor="black"
          setSelectedValue={setContentFormat}
          dropDownContainerStyle={{
            height: '30%',
            width: '10%',
            marginLeft: '1%',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 5,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            paddingVertical: 15,
            shadowRadius: 2,
            shadowOpacity: 1.0,
            elevation: 5,
            borderColor: 'rgba(0,0,0,0.5)',
            zIndex: 200,
          }}
          dropDownValuesTextStyle={{
            fontSize: 14,
            fontFamily: 'Roboto-Regular',
            marginLeft: 10,
            marginVertical: 2,
          }}
          dropDownTextStyle={{
            fontSize: 14,
            fontFamily: 'Open-Sans',
            fontWeight: '300',
          }}
          dropDownValuesContainerStyle={{
            top: 33,
          }}
        />
      </View>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        numColumns={numberOfColumns}
        renderItem={({item}) => (
          <ContentPost
            contentSource={contentSource}
            contentTypeItems={contentTypeItems}
            trigger={trigger}
            isTrigger={isTrigger}
            post={item}
          />
        )}
        ListFooterComponent={() => {
          return (
            <View style={{backgroundColor: 'whitesmoke'}}>
              {isActivityIndicator && (
                <ActivityIndicator size={40} color={'black'} />
              )}
            </View>
          );
        }}
        ListFooterComponentStyle={{
          paddingBottom: '20%',
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          const newContentLimit = contentLimit + 12;
          setContentLimit(newContentLimit);
        }}
      />
    </View>
  );
};

export default ProductTaggingPanelScreen;

const styles = StyleSheet.create({
  taggingPanelContainer: {
    backgroundColor: 'white',
    width: '100%',
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Platform.OS === 'web' ? 75 : 50,
    width: '100%',
    zIndex: 100,
    justifyContent: Platform.OS === 'web' ? 'flex-start' : 'space-around',
  },
});
//justify content platform wise
