export type RootStackParamList = {
    Login: undefined;
    About: {
      userEmail: string;
      isDarkMode: boolean;
    };
    AddTask: {
      todoId?: number;
      description?: string;
      isEditing?: boolean;
      isDarkMode: boolean;
    };
  };
  
  export interface Todo {
    id: number;
    description: string;
    completed: boolean;
  }
  
  export interface Theme {
    backgroundColor: string;
    textColor: string;
    inputBackground: string;
    borderColor: string;
    headerBackground: string;
    placeholderColor: string;
    iconColor: string;
    subtitleColor: string;
    cardBackground: string;
    todoItemBackground: string;
    todoTextColor: string;
    buttonBackground: string;
    buttonText: string;
    alertText: string;
    secondaryText: string;
    linkColor: string;
    toastBackground: string;
    toastText: string;
  }