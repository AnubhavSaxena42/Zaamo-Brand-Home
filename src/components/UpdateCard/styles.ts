import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  updateCardContainer: {
    width: '100%',
    paddingHorizontal: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
  avatarImage: {
    alignSelf: 'flex-start',
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  notificationContainer: {
    flex: 1,
    paddingLeft: '5%',
  },
  notificationText: {
    marginBottom: '2%',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: 'black',
  },
  notificationTime: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: 'rgba(0,0,0,0.5)',
  },
});
