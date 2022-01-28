import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeSelector from '../../components/ThemeSelector/ThemeSelector';
import toastService from '../../services/toast-service';
import AnimatedLottieView from 'lottie-react-native';
import {styles} from './styles';
const windowWidth = Dimensions.get('window').width;
const StoreThemesScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.storeThemesContainer}>
      <ScrollView contentContainerStyle={styles.storeThemesScrollViewContainer}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/DashboardEllipse.png')}
            style={styles.backgroundImageStyle}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
          </TouchableOpacity>
          <Text style={styles.storeThemesHeaderText}>Store Themes</Text>
        </View>
        <View style={styles.animationContainer}>
          <AnimatedLottieView
            source={require('../../assets/animations/coming-soon.json')}
            style={styles.animation}
            loop
            autoPlay
          />
        </View>

        {/*<View
        style={{
          marginTop: '15%',
          paddingHorizontal: '2%',
        }}>
        <ThemeSelector selectorTag={'Pick Base Color'} />
        <ThemeSelector selectorTag={'Font Color'} />
        <ThemeSelector selectorTag={'Icon Set'} />
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          marginTop: '2%',
          paddingLeft: '2%',
        }}>
        Font Style
      </Text>
      <View
        style={{
          marginTop: '2%',
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}>
        <TouchableOpacity
          onPress={() => {
            toastService.showToast('Feature in development', true);
            navigation.navigate('SettingsScreen');
          }}
          style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreThemesScreen;
