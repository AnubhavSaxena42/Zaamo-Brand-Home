import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {ActivityIndicator, View} from 'react-native';
import {tailwind, getColor} from '../../core/tailwind';
import {BarIndicator} from 'react-native-indicators';
const Loader = props => {
  const {visible, textContent, textStyle} = props;

  return (
    <Spinner
      overlayColor="rgba(0, 0, 0, 0.6)"
      visible={visible}
      // textContent={textContent}
      customIndicator={
        <View
          style={{
            paddingVertical: '10%',
            paddingHorizontal: '5%',
            backgroundColor: 'white',
            borderRadius: 10,
            height: 40,
          }}>
          <BarIndicator size={25} count={4} color="black" />
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
