import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  Platform,
  View,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const CollectionOverview = ({imageUrl, name}) => {
  return (
    <View style={styles.collectionOverviewContainer}>
      {/*Image of the product */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: imageUrl,
          }}
        />
      </View>
      {/*Product Information */}
      <View style={styles.collectionInfoContainer}>
        <View>
          <Text style={styles.collectionNameText}>{name}</Text>
        </View>
        <View>
          <Text style={styles.collectionLinkText}>
            https://zaamo.co/maldives
          </Text>
        </View>
      </View>
      {/*Tag button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Tag</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CollectionOverview;

const styles = StyleSheet.create({
  collectionOverviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: Platform.OS === 'web' ? '75%' : '100%',
    height: windowWidth > 500 ? 250 : 120,
    justifyContent: windowWidth > 500 ? 'space-around' : 'space-between',
    backgroundColor: '#f5f5f5',
    marginVertical: 3,
  },
  imageContainer: {},
  image: {
    width: 70,
    height: 68,
  },
  collectionInfoContainer: {
    justifyContent: 'space-around',
  },
  collectionNameText: {
    fontSize: 16,
    color: 'black',
  },
  collectionLinkText: {},

  buttonContainer: {},
  button: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
});
