import {AppRegistry} from 'react-native';
import App from './App.tsx';
// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Generate required css
import iconFont2 from './assets/fonts/Roboto-Regular.ttf';
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: FontAwesome;
}`;
const iconFontStyles2 = `@font-face {
  src: url(${iconFont2});
  font-family: Roboto-Regular;
}`;
// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
  style.styleSheet.cssText = iconFontStyles2;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

const appName = 'Zaamo';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  // Mount the react-native app in the "root" div of index.html
  rootTag: document.getElementById('root'),
});
