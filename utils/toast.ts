import Toast from 'react-native-toast-message';

export default function pushToast(type: "success" | "error", message: string) {
  Toast.show({
    type,
    text1: message
  })
}
