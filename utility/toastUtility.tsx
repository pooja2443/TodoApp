import React from 'react';
import { View, Text } from 'react-native';
import Toast, { ToastConfigParams } from 'react-native-toast-message';

type Theme = {
  toastBackground: string;
  toastText: string;
}

export const createToastConfig = (theme: Theme) => ({
  customToast: ({ text1 }: ToastConfigParams<any>) => (
    <View style={{
      padding: 16,
      backgroundColor: theme.toastBackground,
      borderRadius: 8,
      marginBottom: 40,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }}>
      <Text style={{
        color: theme.toastText,
        fontSize: 14,
        textAlign: 'center',
      }}>{text1}</Text>
    </View>
  )
});

export const showToast = (message: string, type: 'customToast' = 'customToast') => {
  Toast.show({
    type: type,
    text1: message,
    position: "bottom",
    visibilityTime: 2000,
  });
};

export { Toast };
