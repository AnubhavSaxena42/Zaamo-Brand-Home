import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import ThemeSelector from '../../components/ThemeSelector/ThemeSelector';
import toastService from '../../services/toast-service';
const windowWidth = Dimensions.get('window').width;
const StoreThemesScreen = ({navigation, route}) => {
  return (
    <View style={styles.storeThemesContainer}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/DashboardEllipse.png')}
          style={{
            height: 400,
            width: windowWidth,
            zIndex: 1,
            position: 'absolute',
            top: -300,
          }}
        />
        <Text
          style={{
            color: 'white',
            zIndex: 2,
            marginTop: '7%',
            fontSize: 22,
            paddingHorizontal: '10%',
            textAlign: 'center',
          }}>
          Store Themes
        </Text>
      </View>
      <View
        style={{
          marginTop: '15%',
          paddingHorizontal: '2%',
        }}>
        <ThemeSelector selectorTag={'Pick Base Color'} />
        <ThemeSelector selectorTag={'Font Color'} />
        <ThemeSelector selectorTag={'Icon Set'} />
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 16,
          marginTop: '2%',
          paddingLeft: '2%',
        }}>
        Font Style
      </Text>
      <View
        style={{
          marginTop: '2%',
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
        <Text style={styles.fontStyleText}>Font Style</Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          position: 'absolute',
          bottom: 0,
        }}>
        <TouchableOpacity
          onPress={() => {
            toastService.showToast('Feature in development', true);
            navigation.navigate('SettingsScreen');
          }}
          style={styles.button}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoreThemesScreen;

const styles = StyleSheet.create({
  storeThemesContainer: {
    flex: 1,
  },
  button: {
    marginBottom: '10%',
    height: 35,
    borderRadius: 10,
    marginTop: '10%',
    width: '25%',
    alignSelf: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontStyleText: {
    marginTop: '1%',
    padding: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.2)',
  },
});
