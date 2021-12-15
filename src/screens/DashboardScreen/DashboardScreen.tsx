import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MetricCard from '../../components/MetricCard/MetricCard';
import UpdateCard from '../../components/UpdateCard/UpdateCard';
//For web it has to be a scrollview , implement fab properly
const DashboardScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View style={styles.dashboardContainer}>
      <Text
        style={{
          zIndex: 2,
          paddingLeft: '3%',
          paddingTop: '5%',
          color: 'white',
          fontSize: 18,
        }}>
        Overview
      </Text>
      <Image
        source={require('../../assets/images/DashboardEllipse.png')}
        style={{
          height: 400,
          width: windowWidth,
          zIndex: 1,
          position: 'absolute',
          top: -80,
        }}
      />
      <View
        style={{
          zIndex: 2,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: '10%',
        }}>
        <MetricCard
          metric={{type: 'Total Orders', value: '27'}}
          color="lightpink"
        />
        <MetricCard
          metric={{type: 'Total Revenue', value: '12,738'}}
          color="darkseagreen"
        />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          zIndex: 2,
        }}>
        <MetricCard
          metric={{type: 'Store Visits', value: '270'}}
          color="palegoldenrod"
        />
        <MetricCard
          metric={{type: 'Product Views', value: '127'}}
          color="lightblue"
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          position: 'absolute',
          bottom: 50,
          right: 20,
          height: 70,
          width: 70,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 35,
          zIndex: 3,
        }}>
        <Ionicons name="logo-instagram" size={35} color="white" />
      </TouchableOpacity>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 15,
          paddingLeft: '3%',
        }}>
        Recent Updates
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UpdateCard />
        <UpdateCard />
        <UpdateCard />
        <UpdateCard />
        <UpdateCard />
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  metricsContainer: {
    width: '100%',
  },
});
