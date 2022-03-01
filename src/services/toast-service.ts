import Toast from 'react-native-toast-message';

class ToastService {
  showToast = (text, bottom) => {
    Toast.show({
      type: 'zaamoToast',
      text1: text,
      position: bottom ? 'bottom' : 'top',
      bottomOffset: 100,
      topOffset: 100,
    });
  };
}
const toastService = new ToastService();
Object.freeze(toastService);
export default toastService;
