// @ts-nocheck
import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from 'react-native';
import ProductOverview from './ProductOverview';
import Search from './Search';
import {RootState} from '../redux/store/store';
import {useSelector, useDispatch} from 'react-redux';
import {setPageInfo, setProducts} from '../redux/reducers/productsReducer';
import contentService from '../services/content-service';
//Shift this to a screen in order to navigate back from the Product Display Page
const TagProductsModal = ({
  trigger,
  isTrigger,
  taggedProducts,
  setShowProducts,
  contentType,
  contentId,
}) => {
  const listProducts = useSelector(
    (state: RootState) => state.products.products,
  );
  const {hasNextPage, endCursor} = useSelector(
    (state: RootState) => state.products.pageInfo,
  );
  const [isActivityIndicator, setIsActivityIndicator] = useState(false);
  const dispatch = useDispatch();
  const fetchMoreProducts = () => {
    if (hasNextPage) {
      setIsActivityIndicator(true);
      contentService
        .getProducts('QnJhbmQ6MQ==', 10, endCursor)
        .then(res => {
          const {products, pageInfo} = res.data;
          console.log(products, pageInfo);
          const newList = [...listProducts, ...products];
          dispatch(setProducts(newList));
          dispatch(setPageInfo(pageInfo));
          setIsActivityIndicator(false);
        })
        .catch(err => {
          console.log(err);
          setIsActivityIndicator(false);
        });
    }
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <ScrollView
      onScrollEndDrag={fetchMoreProducts}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          fetchMoreProducts();
        }
      }}
      scrollEventThrottle={400}
      showsVerticalScrollIndicator={false}
      style={styles.tagProductsContainer}>
      <Search placeholder={'Enter Product Name'} onSearch={() => {}} />
      {listProducts.map(product => {
        return (
          <ProductOverview
            key={product.id}
            trigger={trigger}
            isTrigger={isTrigger}
            setShowProducts={setShowProducts}
            contentType={contentType}
            contentId={contentId}
            product={product}
            taggedProducts={taggedProducts}
          />
        );
      })}
      <View style={{backgroundColor: 'white'}}>
        {isActivityIndicator && <ActivityIndicator size={40} color={'black'} />}
      </View>
      {/*<FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 90}}
        data={listProducts}
        renderItem={({item}) => (
          <ProductOverview
            trigger={trigger}
            isTrigger={isTrigger}
            setShowProducts={setShowProducts}
            contentType={contentType}
            contentId={contentId}
            product={item}
            taggedProducts={taggedProducts}
          />
        )}
        keyExtractor={item => item.id}
        onEndReached={fetchMoreProducts}
        ListFooterComponent={() => {
          return (
            <View style={{backgroundColor: 'white'}}>
              {isActivityIndicator && (
                <ActivityIndicator size={40} color={'black'} />
              )}
            </View>
          );
        }}
      />*/}
    </ScrollView>
  );
};

export default TagProductsModal;

const styles = StyleSheet.create({
  tagProductsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    width: '100%',
    flex: 1,
  },
});
