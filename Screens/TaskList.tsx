import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, removeTodos } from '@/Redux/Thunks/todoThunk';
import { AppDispatch, RootState } from '@/Redux/Store/store';
import { Todo } from '@/Types/todoType';
import { RootStackParamList } from '@/Types/types';
import useTheme from '@/hooks/useTheme';
import TaskListUI from '@/Screens/TaskListScreen';
import { logOutUser } from '@/Redux/Thunks/authThunk';

type Props = {
  route: RouteProp<RootStackParamList, 'About'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

function TaskList({ route, navigation }: Props) {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { todos, isLoading, error } = useSelector((state: RootState) => state.todos);

  const userEmail = route.params.userEmail;
  const name = userEmail.split('@')[0];

  const initialDarkMode = route.params.isDarkMode;  
  const { isDarkMode, theme } = useTheme(initialDarkMode);

  // Fetch Todos
  const loadTodos = async () => {
    try {
      await dispatch(fetchTodos()).unwrap();
    } catch (error) {
      console.error('Error fetching todos:', error);
      Alert.alert('Error', 'Failed to fetch todos');
    }
  };

  // Refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadTodos();
    } catch (error) {
      console.error('Error refreshing todos:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Delete Todo
  const deleteTask = (id: number) => {
    Alert.alert(
      'Delete Task','Are you sure you want to delete the task',
      [
        {
          text: 'cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () =>{
            try {
              await dispatch(removeTodos(id)).unwrap();
            } catch (error) {
              console.error('Error deleting todo:', error);
              Alert.alert('Error', 'Failed to delete task');
            }
          }
        }
      ]
    )
  };

  // Edit Todo
  const editTask = (todo: Todo) => {
    navigation.navigate('AddTask', {
      isDarkMode,
      todoId: todo.id,
      description: todo.description,
      isEditing: true
    });
  };

  // Add Task
  const addTask = () => {
    navigation.navigate('AddTask', { 
      isDarkMode,
      isEditing: false 
    });
  };

  // logOut handler
  const handleLogOut = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(logOutUser()).unwrap();
              // Navigate to home screen
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
              });
            } catch (error) {
              Alert.alert('Logout Error', error instanceof Error ? error.message : 'Logout failed');
            }
          },
        },
      ],
      { cancelable: true }
    );
  }

  useEffect(() => {
    loadTodos();
    
    // Add listener to refresh todos
    const unsubscribe = navigation.addListener('focus', () => {
      loadTodos();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <TaskListUI
      userName={name}
      todos={todos}
      isLoading={isLoading}
      refreshing={refreshing}
      theme={theme}
      isDarkMode={isDarkMode}
      onRefresh={onRefresh}
      onAddTask={addTask}
      onEditTask={editTask}
      onDeleteTask={deleteTask}
      onRefreshTodos={loadTodos}
      onLogout = {handleLogOut}
    />
  );
}

export default TaskList;