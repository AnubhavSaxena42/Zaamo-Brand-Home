//import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './redux/store/store';
import TaggingPanelStack from './navigation/MainNavigator';
import {HomeTabNavigator} from './navigation/MainNavigator';
import {AuthorizationStack} from './navigation/MainNavigator';
import {MainStackNavigator} from './navigation/MainNavigator';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {getItemFromStorage} from './services/storage-service';
// Initialize Apollo Client

const httpLink = createHttpLink({
  uri: 'https://beta.zaamo.co/graphql/',
});
const authLink = setContext(async (_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = await getItemFromStorage('Token');
  const storeId = await getItemFromStorage('Store-ID');
  ś;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-store-id': storeId ? parseInt(storeId) : '',
      Authorization: token ? `JWT ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <MainStackNavigator />
        </Provider>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
