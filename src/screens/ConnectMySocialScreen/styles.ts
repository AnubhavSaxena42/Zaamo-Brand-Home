import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  connectMySocialContainer: {
    flex: 1,
  },
  connectMySocialScrollViewContainer: {
    flex: 1,
  },
  connectMySocialHeaderContainer: {
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
  connectMySocialFormContainer: {
    paddingHorizontal: '5%',
    height: '90%',
    marginTop: '15%',
    width: '100%',
  },
  connectMySocialFormHeading: {
    fontSize: 18,
    marginBottom: '5%',
    color: 'black',
    fontWeight: '600',
  },
  labelText: {
    marginVertical: '1%',
    color: 'gray',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 25,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputStyle: {
    width: '100%',
    color: 'black',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: '3%',
    marginBottom: 15,
  },
});
