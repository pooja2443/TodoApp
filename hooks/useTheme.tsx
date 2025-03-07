import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

interface Theme {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  inputBackground: string;
  secondaryText: string;
  buttonBackground: string;
  toastBackground: string;
  toastText: string;
  buttonText: string;
  linkColor: string;
  cardBackground: string;
  todoItemBackground: string;
  todoTextColor: string;
  iconColor: string;
  headerBackground: string;
  placeholderColor: string;
  alertText: string;
}

const useTheme = (initialDarkMode?: boolean) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    initialDarkMode !== undefined ? initialDarkMode : systemColorScheme === 'dark'
  );

  useEffect(() => {
    if (initialDarkMode === undefined) {
      setIsDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, initialDarkMode]);

  const theme: Theme = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    textColor: isDarkMode ? '#fff' : '#000',
    borderColor: isDarkMode ? '#444' : '#ddd',
    inputBackground: isDarkMode ? '#333' : '#fff',
    secondaryText: isDarkMode ? '#aaa' : '#666',
    buttonBackground: '#ff7733',
    toastBackground: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    toastText: isDarkMode ? '#1a1a1a' : '#fff',
    buttonText: '#fff',
    linkColor: isDarkMode ? '#66a3ff' : '#3366ff',
    cardBackground: isDarkMode ? '#333' : 'white',
    todoItemBackground: isDarkMode ? 'rgba(75, 75, 75, 0.5)' : 'rgba(128, 128, 128, 0.05)',
    todoTextColor: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : '#333',
    iconColor: isDarkMode ? '#fff' : '#000',
    headerBackground: isDarkMode ? '#333' : '#fff',
    placeholderColor: isDarkMode ? '#888' : '#666',
    alertText: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#666'
  };

  return { isDarkMode, setIsDarkMode, theme };
};

export default useTheme;
