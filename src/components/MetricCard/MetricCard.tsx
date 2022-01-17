import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MetricCard = ({color, metric}) => {
  return (
    <View style={styles.metricCardContainer}>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          height: '10%',
          backgroundColor: color,
          borderRadius: 10,
        }}></View>
      <Text
        style={{
          fontSize: 28,
          color: 'black',
          fontFamily: 'Roboto-Black',
          textAlign: 'center',
        }}>
        {metric.value}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: 'black',
          textAlign: 'center',
          fontFamily: 'Roboto-Black',
        }}>
        {metric.type}
      </Text>
    </View>
  );
};

export default MetricCard;

const styles = StyleSheet.create({
  metricCardContainer: {
    width: '35%',
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    marginBottom: '3%',
    backgroundColor: 'white',
    marginHorizontal: '5%',
  },
});
