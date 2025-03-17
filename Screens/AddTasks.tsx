import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, StatusBar, KeyboardAvoidingView, ActivityIndicator, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import useTheme from '@/hooks/useTheme';
import { RootStackParamList } from '@/Types/types';
import { Todo } from '@/Types/types';
import { api } from '@/Services/api';
import { addTodoStart, addTodoSuccess, addTodoFail, updateTodoStart, updateTodoSuccess, updateTodoFail } from '@/Redux/Slice/todoSlice';
import { useDispatch } from 'react-redux';

type Props = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

export default function AddTask({ route, navigation }: Props) {
  const [description, setDescription] = useState(route.params.description || '');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
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
        dispatch(updateTodoStart());
        const updateTodo = await api.updateTodo(todoId, description);
        dispatch(updateTodoSuccess(updateTodo));
        Alert.alert('Success', 'Task updated successfully');
        navigation.goBack();
      } else {
        // Add new todo - Fixed by passing description parameter
        dispatch(addTodoStart());
        const newTodo = await api.addTodo(description);
        dispatch(addTodoSuccess(newTodo));
        Alert.alert('Success', 'Task added successfully');
        setDescription('');
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error saving todo:', error);
      if (isEditing) {
        dispatch(updateTodoFail(error instanceof Error ? error.message : 'Failed to update task'));
      } else {
        dispatch(addTodoFail(error instanceof Error ? error.message : 'Failed to add task'));
      }
      Alert.alert(
        'Error', 
        isEditing ? 'Failed to update task' : 'Failed to add task'
      );

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar barStyle={theme.textColor === '#fff' ? "light-content" : "dark-content"} />
      
      <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="arrow-back" 
            size={24} 
            color={theme.iconColor} 
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>
          {isEditing ? 'Edit Task' : 'Add New Task'}
        </Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
      >
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.borderColor,
              color: theme.textColor
            }
          ]}
          value={description}
          onChangeText={setDescription}
          placeholder={isEditing ? "Update task description" : "Enter task description"}
          placeholderTextColor={theme.placeholderColor}
          multiline
          autoFocus
        />
      
        <TouchableOpacity 
          style={[
            styles.saveButton,
            { opacity: isLoading ? 0.7 : 1, backgroundColor: theme.buttonBackground }
          ]} 
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[styles.saveButtonText, { color: theme.buttonText }]}>
              {isEditing ? 'Update Task' : 'Add Task'}
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    padding: 8,
  },
  headerRight: {
    width: 40, // For layout balance
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});