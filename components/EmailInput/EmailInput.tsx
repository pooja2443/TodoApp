// src/components/EmailInput/EmailInput.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  theme: {
    textColor: string;
    inputBackground: string;
    borderColor: string;
    secondaryText: string;
  };
  label?: string;
  placeholder?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({ 
  email, 
  setEmail, 
  theme,
  label = "Email",
  placeholder = "Email"
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
      <TextInput
        style={[
          styles.input, 
          {
            borderColor: theme.borderColor,
            backgroundColor: theme.inputBackground,
            color: theme.textColor
          }
        ]}
        value={email}
        placeholder={placeholder}
        placeholderTextColor={theme.secondaryText}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    inputContainer: {
      marginBottom: 20
    },
    label: {
      fontSize: 16,
      marginBottom: 8
    },
    input: {
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      fontSize: 16
    }
  });

export default EmailInput;