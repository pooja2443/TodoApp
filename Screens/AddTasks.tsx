import React, { useState } from 'react';
import { Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { addTodos, updateTodos } from '@/Redux/Thunks/todoThunk';
import { AppDispatch } from '@/Redux/Store/store';
import { RootStackParamList } from '@/Types/types';
import useTheme from '@/hooks/useTheme';
import AddTaskScreen from '@/Screens/AddTaskScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

export default function AddTask({ route, navigation }: Props) {
  const [description, setDescription] = useState(route.params.description || '');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const initialDarkMode = route.params.isDarkMode;
  const isEditing = route.params.isEditing || false;
  const todoId = route.params.todoId;

  // Use the custom theme hook instead of createTheme
  const { theme } = useTheme(initialDarkMode);

  const handleSave = async () => {
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a task description');
      return;
    }
    
    setIsLoading(true);
    try {
      if (isEditing && todoId) {
        // Update existing todo
        await dispatch(updateTodos({ id: todoId, description })).unwrap();
        Alert.alert('Success', 'Task updated successfully');
        navigation.goBack();
      } else {
        // Add new todo
        await dispatch(addTodos(description)).unwrap();
        Alert.alert('Success', 'Task added successfully');
        setDescription('');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error saving todo:', error);
      Alert.alert(
        'Error', 
        isEditing ? 'Failed to update task' : 'Failed to add task'
      );  
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AddTaskScreen
      description={description}
      isLoading={isLoading}
      isEditing={isEditing}
      theme={theme}
      onChangeDescription={setDescription}
      onSave={handleSave}
      onGoBack={() => navigation.goBack()}
    />
  );
}