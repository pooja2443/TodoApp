import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/Screens/LoginScreen';
import TaskListScreeen from '@/Screens/TaskList';
import AddTask from '@/Screens/AddTasks';
import { NavigationContainer } from '@react-navigation/native';
import { Todo } from '@/Types/todoType';
import { RootStackParamList } from '@/Types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
    return (
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: 'transparent',
          }
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={LoginScreen} 
          options={{
            title: 'Login',
          }}
        />
        <Stack.Screen 
          name="About" 
          component={TaskListScreeen} 
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