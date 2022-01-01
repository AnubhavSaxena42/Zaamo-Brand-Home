import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {ActivityIndicator, View} from 'react-native';
import {tailwind, getColor} from '../../core/tailwind';

const Loader = props => {
  const {visible, textContent, textStyle} = props;

  return (
    <Spinner
      overlayColor="rgba(0, 0, 0, 0.6)"
      visible={visible}
      // textContent={textContent}
      customIndicator={
        <View style={tailwind('bg-gray-100 p-6 rounded-lg')}>
          <ActivityIndicator color={'#0089CF'} size={34} />
        </View>
      }
      textStyle={styles.spinnerTextStyle}
    />
  );
};

const styles = {
  spinnerTextStyle: {
    color: '#FFF',
  },
};

export default Loader;
