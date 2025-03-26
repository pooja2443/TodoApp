import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';

interface CommonButtonProps {
  onPress: () => void;
  title: string;
  theme: {
    buttonBackground: string;
    buttonText: string;
  };
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  onPress,
  title,
  theme,
  style,
  textStyle,
  loading = false
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        { backgroundColor: theme.buttonBackground },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.buttonText, 
        { color: theme.buttonText },
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  }
});

export default CommonButton;