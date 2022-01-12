import 'react-native-gesture-handler';
import 'react-native-reanimated';
import {AppRegistry} from 'react-native';
import App from './App.tsx';

const appName = 'Zaamo';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  // Mount the react-native app in the "root" div of index.html
  rootTag: document.getElementById('root'),
});
