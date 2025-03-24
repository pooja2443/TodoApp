export type RootStackParamList = {
  Home: undefined;
  About: {
    userEmail: string;
    isDarkMode: boolean;
  };
  AddTask: {
    todoId?: number;
    description?: string;
    isEditing?: boolean;
    isDarkMode: boolean;
    userEmail: string;
  };
  SignUp: undefined;
};


