import React from 'react';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
import ContentActions from './ContentActions';
import ContentOverview from './ContentOverview';
import InfluencerInfo from './InfluencerInfo';
const windowWidth = Dimensions.get('window').width;
const ContentPost = ({
  post,
  contentSource,
  contentTypeItems,
  trigger,
  isTrigger,
}) => {
  return (
    <View style={styles.postContainer}>
      {/*Content Overview Component */}
      <ContentOverview post={post} source={contentSource} />
      {/*Post actions/tags Component */}
      <ContentActions
        contentTypeItems={contentTypeItems}
        post={post}
        trigger={trigger}
        isTrigger={isTrigger}
      />
      {/*Influencer info Component */}
      <InfluencerInfo post={post} />
    </View>
  );
};

export default ContentPost;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'whitesmoke',
    width: windowWidth > 500 ? windowWidth / 2 - 10 : windowWidth,
    paddingHorizontal: windowWidth > 500 ? 10 : 10,
    paddingVertical: 5,
    marginHorizontal: windowWidth > 500 ? 2.5 : 0,
    marginVertical: 10,
  },
});
