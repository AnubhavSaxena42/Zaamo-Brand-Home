import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  ordersOverviewContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: '7%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  value: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
  key: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.5)',
    fontFamily: 'Roboto-Regular',
  },
  metricContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
