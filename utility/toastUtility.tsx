import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast, { BaseToast, ToastConfigParams } from 'react-native-toast-message';
import useTheme from '@/hooks/useTheme';

const useToastConfig = (theme: any) => {
  const customToastConfig = {
    customToast: ({ text1 }: ToastConfigParams<any>) => (
      <View style={[styles.toastContainer, { backgroundColor: theme.toastBackground }]}>
        <Text style={[styles.toastText, { color: theme.toastText }]}>{text1}</Text>
      </View>
    )
  };

  return customToastConfig;
};

export const createToastConfig = () => {
  const { theme } = useTheme();
  return useToastConfig(theme);
};

export const showToast = (message: string, type: 'customToast' | 'success' | 'error' = 'customToast') => {
  Toast.show({
    type: type,
    text1: message,
    position: "bottom",
    visibilityTime: 2000,
  });
};

const styles = StyleSheet.create({
  toastContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastText: {
    fontSize: 14,
    textAlign: 'center',
  }
});

export { Toast };