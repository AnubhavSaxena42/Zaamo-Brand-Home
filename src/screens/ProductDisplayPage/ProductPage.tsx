import React, {useMemo, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  ImageBackground,
  FlatList,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
const ProductPage = ({navigation, route}) => {
  const {product} = route.params;
  console.log('Product:' + JSON.stringify(product));
  const {width, height} = Dimensions.get('window');
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['12%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const data = product.images.map(image => image.url);
  const offsets = data.map((item, index) => {
    if (index === 0) return height;
    else return height * index;
  });
  console.log('data:', data);
  const imageW = width * 0.8;
  const imageH = imageW * 1.6;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.productPageContainer}>
      {/* <ImageBackground
        source={{uri: product.thumbnail}}
        resizeMode="cover"
        blurRadius={5}
        style={{width: '100%', height: '100%'}}>
        <Swiper
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          loop={false}
          showsPagination={false}
          style={styles.wrapper}>
          {product.images.map(image => {
            return (
              <View style={styles.slide1}>
                <Image
                  source={{uri: image.url}}
                  style={{
                    flex: 1,
                    width: '100%',
                    alignSelf: 'center',
                    height: '100%',
                    marginBottom: '5%',
                  }}
                  resizeMode="contain"
                />
              </View>
            );
          })}
        </Swiper>
        
      </ImageBackground>*/}
      <View style={[StyleSheet.absoluteFillObject]}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * height,
            index * height,
            (index + 1) * height,
          ];
          const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              source={{uri: image}}
              key={`Image-${index}`}
              resizeMode="cover"
              blurRadius={20}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        snapToOffsets={offsets}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View
              style={{
                height: height,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: item}}
                style={{
                  marginBottom: '25%',
                  width: imageW,
                  height: imageH,
                  resizeMode: 'cover',
                }}
              />
            </View>
          );
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        handleStyle={{backgroundColor: 'whitesmoke', borderRadius: 40}}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <View style={styles.productOverview}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: '3%',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: 'lightgray',
                paddingBottom: '5%',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  maxWidth: '70%',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {product.name}
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                ₹{product.price}
              </Text>
            </View>
          </View>
          <View style={{paddingHorizontal: '3%', marginTop: '2%'}}>
            <Text>Select Size</Text>
            {/*<View style={{flexDirection: 'row', marginVertical: '2%'}}>
                {product.variants.map(variant => {
                  return (
                    <View
                      style={{
                        borderWidth: 1,
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderColor: 'gray',
                        marginRight: '4%',
                        borderRadius: 5,
                      }}>
                      <Text style={{textAlign: 'center'}}>{variant.name}</Text>
                    </View>
                  );
                })}
              </View>*/}
            <Text>Product Description</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  productPageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  productOverview: {},
  contentContainer: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    alignSelf: 'center',
    width: '80%',
    height: 300,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
