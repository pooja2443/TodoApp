import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from '@/Screens/LoginScreen';
import SecondScreen from '@/Screens/TaskList';
import AddTask from '@/Screens/AddTasks';
import { NavigationContainer } from '@react-navigation/native';

// Define the type for navigation parameters
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

// Define Todo type for use across the app
export interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
      <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: 'transparent',
        }
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={FirstScreen} 
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen 
        name="About" 
        component={SecondScreen} 
        options={{
          title: 'Todo List',
        }}
      />
      <Stack.Screen 
        name="AddTask" 
        component={AddTask} 
        options={({ route }) => ({
          title: route.params?.isEditing ? 'Edit Task' : 'Add Task',
        })}
      />
    </Stack.Navigator>
      );
}