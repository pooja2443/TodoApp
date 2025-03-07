export const createTheme = (isDarkMode: boolean) => {
    return {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
      textColor: isDarkMode ? '#fff' : '#000',
      inputBackground: isDarkMode ? '#333' : '#fff',
      borderColor: isDarkMode ? '#444' : '#ddd',
      headerBackground: isDarkMode ? '#333' : '#fff',
      placeholderColor: isDarkMode ? '#888' : '#666',
      iconColor: isDarkMode ? '#fff' : '#000',
      subtitleColor: isDarkMode ? '#aaa' : '#666',
      cardBackground: isDarkMode ? '#333' : 'white',
      todoItemBackground: isDarkMode ? 'rgba(75, 75, 75, 0.5)' : 'rgba(128, 128, 128, 0.05)',
      todoTextColor: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : '#333',
      buttonBackground: '#ff7733',
      buttonText: '#fff',
      alertText: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : '#666',
      secondaryText: isDarkMode ? '#aaa' : '#666',
      linkColor: isDarkMode ? '#66a3ff' : '#3366ff',
      toastBackground: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
      toastText: isDarkMode ? '#1a1a1a' : '#fff'
    };
  };