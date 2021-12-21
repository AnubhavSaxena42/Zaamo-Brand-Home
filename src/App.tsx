//import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './redux/store/store';
import TaggingPanelStack from './navigation/MainNavigator';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://beta.zaamo.co/graphql/',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <TaggingPanelStack />
        </Provider>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
