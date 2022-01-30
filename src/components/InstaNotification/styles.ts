import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  instaNotificationContainer: {
    width: '100%',
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    paddingHorizontal: '2%',
    paddingVertical: '3%',
  },
  notificationInfoContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '5%',
  },
  notificationInfoSubContainer: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  rowOneContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '2%',
    marginBottom: '1%',
  },
  userNameText: {
    fontFamily: 'Roboto-Black',
    color: 'black',
  },
  postTimeText: {
    color: 'rgba(0,0,0,0.3)',
    fontFamily: 'Roboto-Regular',
  },
  customisedPricingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  customPriceText: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 3,
    marginBottom: 2,
    borderRadius: 4,
    fontFamily: 'Roboto-Regular',
  },
  sendButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});

export default styles;
