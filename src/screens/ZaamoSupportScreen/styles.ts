import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  zaamoSupportContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '7%',
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
    position: 'absolute',
    left: 10,
  },
  headerText: {
    color: 'white',
    zIndex: 2,

    fontSize: 22,
    paddingHorizontal: '10%',
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  contentContainer: {
    paddingHorizontal: '5%',
    height: '90%',
    marginTop: '15%',
    width: '100%',
  },
  subHeaderText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'rgba(0,0,0,0.5)',
  },
  subHeaderUnderline: {
    width: '10%',
    backgroundColor: 'gray',
    height: 3,
    alignSelf: 'center',
    marginBottom: '8%',
  },
  subHeaderLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
  subHeaderValue: {
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: '5%',
  },
  inputLabel: {
    marginVertical: '5%',
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  inputStyle: {
    width: '100%',
    color: 'black',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: '3%',
    marginBottom: 15,
  },
  button: {
    marginTop: '5%',
    height: 35,
    borderRadius: 10,
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
