module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-jsx',
    ['@babel/plugin-proposal-private-methods', {loose: true}],
    ['@babel/plugin-proposal-private-property-in-object', {loose: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
  ],
};
