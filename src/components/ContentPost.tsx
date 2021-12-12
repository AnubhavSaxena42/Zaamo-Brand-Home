// @ts-nocheck
import React, {useState} from 'react';
import {Platform} from 'react-native';
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
  const [contentType, setContentType] = useState();

  return (
    <View style={styles.postContainer}>
      {/*Content Overview Component */}
      <ContentOverview
        post={post}
        contentType={contentType}
        setContentType={setContentType}
        contentTypeItems={contentTypeItems}
        source={contentSource}
      />
      {/*Post actions/tags Component */}
      <ContentActions
        contentType={contentType}
        setContentType={setContentType}
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
    width: windowWidth > 500 ? windowWidth / 4 - 10 : windowWidth,
    paddingHorizontal: windowWidth > 500 ? 10 : 10,
    paddingVertical: 5,
    marginHorizontal: windowWidth > 500 ? 2.5 : 0,
    marginTop: 10,
    marginBottom: Platform.OS === 'web' ? 60 : 10,
  },
});
