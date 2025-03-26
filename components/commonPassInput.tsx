import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  theme: {
    textColor: string;
    inputBackground: string;
    borderColor: string;
    secondaryText: string;
  };
  label?: string;
  placeholder?: string;
  minLength?: number;
  validatePassword?: (password: string) => boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ 
  password, 
  setPassword, 
  theme,
  label = "Password",
  placeholder = "Password",
  minLength = 8,
  validatePassword = (pass) => pass.length >= minLength
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
      <View 
        style={[
          styles.passwordContainer, 
          {
            borderColor: theme.borderColor,
            backgroundColor: theme.inputBackground
          }
        ]}
      >
        <TextInput
          style={[
            styles.passwordInput, 
            {
              color: theme.textColor,
            }
          ]}
          value={password}
          placeholder={placeholder}
          placeholderTextColor={theme.secondaryText}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          onPress={togglePasswordVisibility} 
          style={styles.eyeIconContainer}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
            size={24}
            color={theme.textColor}
          />
        </TouchableOpacity>
      </View>
      {!validatePassword(password) && password.length > 0 && (
        <Text style={[styles.errorText, { color: 'red' }]}>
          Password must be at least {minLength} characters long
        </Text>
      )}
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16
  },
  eyeIconContainer: {
    padding: 10,
    marginRight: 4
  },
  errorText: {
    marginTop: 4,
    fontSize: 12
  }
});

export default PasswordInput;