import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/Redux/Store/store';
import { setDarkMode } from '@/Redux/Slice/uiSlice';

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
  const dispatch = useDispatch();
  
  // Get the dark mode state from Redux
  const reduxDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);
  
  const [localDarkMode, setLocalDarkMode] = useState<boolean>(reduxDarkMode);

  useEffect(() => {
    setLocalDarkMode(reduxDarkMode);
  }, [reduxDarkMode]);

  useEffect(() => {
    if (reduxDarkMode === undefined && initialDarkMode === undefined) {
      const systemIsDark = systemColorScheme === 'dark';
      setLocalDarkMode(systemIsDark);
      dispatch(setDarkMode(systemIsDark));
    } else if (initialDarkMode !== undefined && reduxDarkMode === undefined) {
      dispatch(setDarkMode(initialDarkMode));
    }
  }, []);  

  const theme: Theme = {
    backgroundColor: localDarkMode ? '#1a1a1a' : '#f5f5f5',
    textColor: localDarkMode ? '#fff' : '#000',
    borderColor: localDarkMode ? '#444' : '#ddd',
    inputBackground: localDarkMode ? '#333' : '#fff',
    secondaryText: localDarkMode ? '#aaa' : '#666',
    buttonBackground: '#ff7733',
    toastBackground: localDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    toastText: localDarkMode ? '#1a1a1a' : '#fff',
    buttonText: '#fff',
    linkColor: localDarkMode ? '#66a3ff' : '#3366ff',
    cardBackground: localDarkMode ? '#333' : 'white',
    todoItemBackground: localDarkMode ? 'rgba(75, 75, 75, 0.5)' : 'rgba(128, 128, 128, 0.05)',
    todoTextColor: localDarkMode ? 'rgba(255, 255, 255, 0.8)' : '#333',
    iconColor: localDarkMode ? '#fff' : '#000',
    headerBackground: localDarkMode ? '#333' : '#fff',
    placeholderColor: localDarkMode ? '#888' : '#666',
    alertText: localDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#666'
  };

  // Toggle function that only updates Redux 
  const toggleTheme = () => {
    dispatch(setDarkMode(!localDarkMode));
  };

  return {
    isDarkMode: localDarkMode,
    setIsDarkMode: (value: boolean) => dispatch(setDarkMode(value)),
    toggleTheme,
    theme
  };
};

export default useTheme;