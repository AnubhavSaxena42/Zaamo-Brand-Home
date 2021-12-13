// @ts-nocheck
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CollectionOverview from './CollectionOverview';
import Search from './Search';
import {useSelector, dispatch} from 'react-redux';
const TagCollectionsModal = ({setShowCollections}) => {
  const listCollections = useSelector(
    (state: RootState) => state.products.collections,
  );
  const fetchMoreProducts = () => {
    return;
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
      <Search
        onBackPress={setShowCollections}
        placeholder={'Enter Collection Name'}
        onSearch={() => {}}
      />
      {listCollections.map(collection => (
        <CollectionOverview
          imageUrl={collection.image_url}
          name={collection.name}
        />
      ))}
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

export default TagCollectionsModal;

const styles = StyleSheet.create({
  tagCollectionsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
});
