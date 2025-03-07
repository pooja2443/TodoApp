import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from '@/Screens/LoginScreen';
import SecondScreen from '@/Screens/TaskList';
import AddTask from '@/Screens/AddTasks';
import { RootStackParamList } from '@/Types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default AppNavigator;