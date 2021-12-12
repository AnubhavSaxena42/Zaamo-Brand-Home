const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: path.join(__dirname, 'index.web.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      '@storybook/react-native': '@storybook/react',
      'styled-components/native': 'styled-components',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules[/\\](?!react-native-vector-icons)/,
        use: {
          loader: 'babel-loader',
          options: {
            // Disable reading babel configuration
            babelrc: false,
            configFile: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-flow',
              '@babel/preset-typescript',
              {
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-proposal-object-rest-spread',
                ],
              },
            ],
          },
        },
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader', // or directly file-loader
        include: path.resolve(
          __dirname,
          '../node_modules/react-native-vector-icons',
        ),
      },
    ],
  },
  plugins: [HTMLWebpackPluginConfig],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
};
