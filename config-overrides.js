const path = require('path');
const {override, addBabelPlugins, babelInclude} = require('customize-cra');
const ttf = {
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
};
module.exports = override(
  ...addBabelPlugins('@babel/plugin-proposal-class-properties'),
  babelInclude([
    path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
    path.resolve(__dirname, 'node_modules/expo-document-picker'),
    path.resolve(__dirname, 'src'),
  ]),
);
