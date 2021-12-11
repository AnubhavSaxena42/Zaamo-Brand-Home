import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Header from '../components/Header';
const VariantRow = ({variant}) => {
  return (
    <View style={styles.variantRowContainer}>
      <View style={styles.variantNameContainer}>
        <Text style={styles.variantNameText}>{variant}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={'number-pad'}
          placeholder="Enter Stock here"
          style={styles.stockInput}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={'number-pad'}
          placeholder="Enter Price here"
          style={styles.priceInput}
        />
      </View>
    </View>
  );
};
const VariantScreen = ({navigation, route}) => {
  const {variations} = route.params;
  return (
    <ScrollView style={styles.variantContainer}>
      <GestureRecognizer
        config={{directionalOffsetThreshold: 30, velocityThreshold: 0.5}}
        onSwipeRight={() => navigation.goBack()}>
        <Header />
        <View style={styles.variantHeaderContainer}>
          <View style={styles.variantNameHeader}>
            <Text style={styles.headerText}>Variants</Text>
          </View>
          <View style={styles.variantStockHeader}>
            <Text style={styles.headerText}>Stock</Text>
          </View>
          <View style={styles.variantPriceHeader}>
            <Text style={styles.headerText}>Price</Text>
          </View>
        </View>
        <View>
          {variations.map(variation => (
            <VariantRow variant={variation} />
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('panel');
          }}>
          <View style={styles.confirmButtonContainer}>
            <View style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </View>
          </View>
        </TouchableOpacity>
      </GestureRecognizer>
    </ScrollView>
  );
};

export default VariantScreen;

const styles = StyleSheet.create({
  variantContainer: {
    backgroundColor: '#f8f8f8',
  },
  variantHeaderContainer: {
    flexDirection: 'row',
    marginVertical: '5%',
  },
  variantNameContainer: {
    backgroundColor: 'white',
    width: '31%',
    height: '100%',
    borderColor: 'black',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
  variantNameHeader: {
    width: '33%',
  },
  variantStockHeader: {
    width: '33%',
  },
  variantPriceHeader: {
    width: '33%',
  },
  variantRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '1%',
    height: 90,
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    width: '31%',
    height: '100%',
    textAlign: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceInput: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  stockInput: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  variantNameText: {
    textAlign: 'center',
    fontSize: 24,
    color: 'black',
    fontWeight: '700',
  },
  confirmButtonContainer: {
    marginVertical: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    backgroundColor: 'black',
    width: '50%',
    padding: '3%',
    borderRadius: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
});
