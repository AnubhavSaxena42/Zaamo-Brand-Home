//import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './redux/store/store';
import TaggingPanelStack from './navigation/MainNavigator';
import {HomeTabNavigator} from './navigation/MainNavigator';
import {AuthorizationStack} from './navigation/MainNavigator';
const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <HomeTabNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
