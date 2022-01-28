import React from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  Image,
  Dimensions,
  Pressable,
  View,
} from 'react-native';
import {styles} from './styles';
const {width, height} = Dimensions.get('screen');
const DATA = [
  {
    key: '123123',
    title: 'Manage Orders,Products and Collections',
    description:
      'Update Fulfillment Status for orders, create or edit your existing collections and products!',
    image: require('../../assets/images/carousel-1.png'),
  },
  {
    key: '123124',
    title: 'Send customised prices to potential customers',
    description:
      'Get notified when your products spark interest with potential customers and the option to send them customised prices!',
    image: require('../../assets/images/carousel-2.png'),
  },
  {
    key: '123125',
    title: 'Receive Updates about successful campaigns',
    description:
      'Keep up to date with the information about successful campaigns launched by brands similar to yours!',
    image: require('../../assets/images/carousel-3.png'),
  },
  {
    key: '123126',
    title: "Match your store's vibe with your brand",
    description:
      "Receive recommendations on how to customise your store's theme and styling and set it up to match your brand's vibe",
    image: require('../../assets/images/carousel-4.png'),
  },
];
const Indicator = ({scrollX}) => {
  return (
    <View style={{position: 'absolute', bottom: 30, flexDirection: 'row'}}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              opacity,
              margin: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};
const Backdrop = ({scrollX}) => {
  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, {backgroundColor: 'black'}]}
    />
  );
};

const Square = ({scrollX}) => {
  const rotateSquare = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );
  const rotate = rotateSquare.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });
  const translateX = rotateSquare.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  return (
    <Animated.View
      style={{
        top: -height * 0.65,
        left: -height * 0.3,
        width: height,
        height: height,
        backgroundColor: '#fff',
        borderRadius: 86,
        position: 'absolute',
        transform: [{rotate}, {translateX}],
      }}
    />
  );
};

const BrandHomeOnboardingScreen = ({navigation}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.BrandHomeOnboardingScreenContainer}>
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        pagingEnabled
        contentContainerStyle={{paddingBottom: 100}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View style={styles.carouselItem}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.imageStyle} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
      <Pressable
        onPress={() => navigation.navigate('MobileOTPScreen')}
        style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </View>
  );
};

export default BrandHomeOnboardingScreen;
