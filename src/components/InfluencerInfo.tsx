import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const InfluencerInfo = ({post}) => {
  const [caption, tags] = post.caption.split('\n');
  return (
    <View style={styles.influencerContainer}>
      {/*Handle and number of followers */}
      <View style={styles.influencerStatsContainer}>
        <View style={styles.handleContainer}>
          <Text style={styles.handleText}>{post.brand}</Text>
        </View>
        {/*<View style={styles.followerCountContainer}>
          <Text style={styles.followerCountText}>
            {post.followers.toString()} followers
          </Text>
  </View>*/}
      </View>
      {/*Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>{caption}</Text>
      </View>
      {/*tags */}
      <View style={styles.tagsContainer}>
        <Text style={styles.tagsText}>{tags}</Text>
      </View>
    </View>
  );
};

export default InfluencerInfo;

const styles = StyleSheet.create({
  influencerContainer: {
    paddingHorizontal: 7,
    marginTop: 20,
    zIndex: 2,
  },
  influencerStatsContainer: {
    flexDirection: 'row',
  },
  handleContainer: {
    marginRight: 10,
    zIndex: 2,
  },
  handleText: {
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Roboto-Regular',
  },
  followerCountContainer: {},
  followerCountText: {
    color: 'black',
  },
  captionContainer: {
    marginVertical: 15,
  },
  captionText: {
    fontFamily: 'Roboto-Regular',
  },
  tagsContainer: {},
  tagsText: {
    fontFamily: 'Roboto-Regular',
  },
});
