import React, {useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './redux/store/store';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {MainStackNavigator} from './navigation/MainNavigator';
import {relayStylePagination} from '@apollo/client/utilities';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import Loader from './components/Loader/Loader';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
import {useSelector} from 'react-redux';
import {setContext} from '@apollo/client/link/context';
import {getItemFromStorage} from './services/storage-service';
import codePush from 'react-native-code-push';

const uploadLink = createUploadLink({
  uri: 'https://production.zaamo.co/graphql/',
});

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      contentContainerStyle={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 10,
        flex: 1,
      }}
      text2Style={{
        color: 'white',
      }}
      text1Style={{
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  zaamoToast: ({text1, props}) => (
    <View
      style={{
        width: '75%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '4%',
        paddingVertical: '2%',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <Text style={{color: 'white', fontSize: 12}}>{text1}</Text>
    </View>
  ),
};

const authLink = setContext(async (_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = await getItemFromStorage('Token');
  const storeId = await getItemFromStorage('Store-ID');
  console.log('XSTOREID:::', storeId);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-store-id': storeId ? parseInt(storeId) : '',
      Authorization: token ? `JWT ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache({
    typePolicies: {
      Brand: {
        merge: true,
        fields: {
          products: relayStylePagination(),
        },
      },
      Store: {
        merge: true,
        fields: {
          collections: relayStylePagination(),
        },
      },
      Collection: {
        merge: true,
        fields: {
          products: relayStylePagination(),
        },
      },
      Query: {
        merge: true,
        fields: {
          products: relayStylePagination(),
          vouchers: relayStylePagination(),
          collections: relayStylePagination(),
          orders: relayStylePagination(),
          masterDashboard: relayStylePagination(),
        },
      },
    },
  }),
});

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  const Spinner = () => {
    const loaderStatus = useSelector(state => state.appVariables.loaderStatus);
    return <Loader visible={loaderStatus} textContent={'Please wait...'} />;
  };

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <GestureHandlerRootView style={{flex: 1}}>
            <Spinner />
            <MainStackNavigator />
            <Toast config={toastConfig} />
          </GestureHandlerRootView>
        </Provider>
      </ApolloProvider>
    </NavigationContainer>
  );
};

let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_START};

export default codePush(codePushOptions)(App);
