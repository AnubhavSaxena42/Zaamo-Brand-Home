import React, {useState, useMemo, useRef, useCallback, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {WebView} from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import {styles} from './styles';

const {width, height} = Dimensions.get('window');
const imageW = width * 0.9;
const imageH = imageW * 1.2;
const ProductPage = ({navigation, route}) => {
  const {product} = route.params;
  console.log('Product:', product);

  const [activeIndex, setActiveIndex] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [120, '75%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  useEffect(() => {
    handlePresentModalPress();
  }, [bottomSheetModalRef.current]);
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const data = product.images.map(image => image.url);
  const offsets = data.map((item, index) => {
    if (index === 0) return height;
    else return height * index;
  });
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const handleScroll = event => {
    const positionY = event.nativeEvent.contentOffset.y;
    const totalHeight = event.nativeEvent.layoutMeasurement.height;
    const current = Math.floor(Math.abs(positionY) / totalHeight);
    setActiveIndex(current);
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.productPageContainer}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButton}>
            <Ionicons name="arrow-back-sharp" color={'black'} size={30} />
          </TouchableOpacity>

          {data.length !== 1 && (
            <View style={styles.paginationDotsContainer}>
              {data.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={{
                      marginVertical: '40%',
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor:
                        activeIndex === index ? '#007aff' : 'rgba(0,0,0,0.2)',
                    }}
                  />
                );
              })}
            </View>
          )}

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
                  {
                    position: 'absolute',
                    height,
                    width,
                    opacity,
                  },
                ]}
              />
            );
          })}

          <Animated.FlatList
            data={data}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true, listener: event => handleScroll(event)},
            )}
            disableIntervalMomentum
            decelerationRate={'fast'}
            snapToOffsets={offsets}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View style={styles.carouselItemContainer}>
                  <Image
                    source={{uri: item}}
                    style={styles.carouselImageStyle}
                  />
                </View>
              );
            }}
          />
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          handleStyle={styles.bottomSheetHandleStyle}
          onChange={handleSheetChanges}>
          <BottomSheetScrollView style={styles.contentContainer}>
            <View style={styles.productOverview}>
              <View style={styles.bottomSheetHeadingContainer}>
                {/*<Text style={styles.brandNameText}>{product.brandName}</Text>*/}
                <Text style={styles.brandNameText}>{product.name}</Text>
              </View>
              <View>
                <Text style={styles.productPriceText}>₹{product.price}</Text>
              </View>
            </View>
            <View style={styles.productDetailsContainer}>
              <Text style={styles.productDetailsLabel}>Sizes Available</Text>
              <View style={styles.variantsContainer}>
                {product.variants?.map(variant => (
                  <View>
                    <View style={styles.variantBox}>
                      <Text style={styles.variantNameText}>{variant.name}</Text>
                    </View>
                    <View style={{...styles.variantBox, borderWidth: 0}}>
                      <Text style={styles.variantNameText}>
                        {variant.stocks[0].quantity}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              <Text style={styles.productDetailsLabel}>
                Product Description
              </Text>
              <HTMLView value={product.description} />
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default ProductPage;
