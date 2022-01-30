import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {styles} from './styles';
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
      <Text style={styles.metricValueText}>{metric.value}</Text>
      <Text style={styles.metricTypeText}>{metric.type}</Text>
    </View>
  );
};

export default MetricCard;
