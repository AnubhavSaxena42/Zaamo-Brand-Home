import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import toastService from '../../services/toast-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedLottieView from 'lottie-react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';

const BrandGuidelinesScreen = ({navigation, route}) => {
  const guidelines = useSelector(state => state.user.creatorGuidelines);
  console.log(guidelines);
  return (
    <SafeAreaView style={styles.brandGuidelinesContainer}>
      <ScrollView contentContainerStyle={styles.brandGuidelinesContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/images/DashboardEllipse.png')}
            style={styles.backgroundImage}
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="arrow-back-sharp" color={'white'} size={35} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Brand Guidelines</Text>
        </View>
        {/*<View style={styles.animationContainer}>
          <AnimatedLottieView
            source={require('../../assets/animations/coming-soon.json')}
            style={styles.animation}
            loop
            autoPlay
          />
        </View>*/}
        <View style={styles.animationContainer}>
          <Text style={{color: 'black'}}>{guidelines}</Text>
        </View>
        {/* Dont delete the commented JSX below */}
        {/*<View
        style={{
          paddingHorizontal: '5%',
          height: '90%',
          marginTop: '15%',
          width: '100%',
        }}>
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Influencer Commission(in %)
        </Text>
        <TextInput
          style={{
            width: '100%',
            borderWidth: 1,
            color: 'gray',
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            paddingHorizontal: '5%',
            backgroundColor: 'white',
          }}
          placeholder={'13%'}
        />
        <Text
          style={{
            marginVertical: '5%',
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Brand Guidelines
        </Text>
        <TextInput
          style={{
            width: '100%',
            color: 'gray',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
            backgroundColor: 'white',
            paddingHorizontal: '5%',
          }}
          numberOfLines={10}
          textAlignVertical={'top'}
          placeholder={'Enter The guidelines'}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          position: 'absolute',
          bottom: 25,
        }}>
        <TouchableOpacity
          onPress={() => {
            toastService.showToast('Feature in Development', true);
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

export default BrandGuidelinesScreen;
