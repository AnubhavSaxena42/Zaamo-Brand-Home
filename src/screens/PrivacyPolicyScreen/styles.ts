import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  privacyPolicyContainer: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
  },
  backgroundImage: {
    height: 400,
    width: width,
    zIndex: 1,
    position: 'absolute',
    top: -300,
  },
  backButton: {
    zIndex: 2,
    marginTop: '6%',
    position: 'absolute',
    left: 10,
  },
  headerText: {
    color: 'white',
    zIndex: 2,
    marginTop: '7%',
    fontSize: 22,
    paddingHorizontal: '10%',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  privacyPolicyScrollViewContainer: {
    paddingHorizontal: '5%',
    height: '90%',
    marginTop: '15%',
    width: '100%',
  },
  subHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeaderText: {
    color: 'gray',
  },
  editButton: {
    flexDirection: 'row',
    padding: '1%',
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    alignItems: 'center',
    width: 70,
    borderRadius: 4,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  privacyPolicyText: {
    color: 'gray',
    marginTop: '4%',
  },
  button: {
    marginBottom: '10%',
    height: 35,
    borderRadius: 10,
    marginTop: '10%',
    width: '25%',
    alignSelf: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
