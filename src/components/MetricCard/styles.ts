import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
  metricValueText: {
    fontSize: 28,
    color: 'black',
    fontFamily: 'Roboto-Black',
    textAlign: 'center',
  },
  metricTypeText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Roboto-Black',
  },
});
