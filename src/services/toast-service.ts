import {Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';
class ToastService {
  showToast = (text, bottom) => {
    const commonToast = Platform.OS === 'android' ? ToastAndroid : Toast;
    if (text) {
      commonToast.showWithGravity(
        text,
        Toast.LONG,
        bottom ? Toast.BOTTOM : Toast.CENTER,
      );
    }
  };
}
const toastService = new ToastService();
Object.freeze(toastService);
export default toastService;
