import React from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
  View,
} from 'react-native';
import MetricCard from '../../components/MetricCard/MetricCard';
import UpdateCard from '../../components/UpdateCard/UpdateCard';
const DashboardScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <ScrollView style={styles.dashboardContainer}>
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
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 15,
          paddingLeft: '3%',
        }}>
        Recent Updates
      </Text>
      <UpdateCard />
      <UpdateCard />
      <UpdateCard />
      <UpdateCard />
      <UpdateCard />
    </ScrollView>
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
