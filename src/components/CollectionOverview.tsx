import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';

const CollectionOverview = () => {
  return (
    <View style={styles.collectionOverviewContainer}>
      {/*Image of the product */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: 'https://i.pinimg.com/236x/a7/e0/53/a7e053c72e257cab69f8230b22e05fd8--read-books-trust-me.jpg',
          }}
        />
      </View>
      {/*Product Information */}
      <View style={styles.collectionInfoContainer}>
        <View>
          <Text style={styles.collectionNameText}>Maldives collection</Text>
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
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    marginVertical: 5,
    paddingHorizontal: 12,
    height: 90,
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
