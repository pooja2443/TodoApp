import React from 'react';
import { View,Text,TouchableOpacity,FlatList,SafeAreaView,StatusBar,ActivityIndicator,RefreshControl,StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Todo } from '@/Types/todoType';

type TaskListUIProps = {
  userName: string;
  todos: Todo[];
  isLoading: boolean;
  refreshing: boolean;
  theme: any;
  isDarkMode: boolean;
  onRefresh: () => void;
  onAddTask: () => void;
  onEditTask: (todo: Todo) => void;
  onDeleteTask: (id: number) => void;
  onRefreshTodos: () => void;
};

const TaskListScreen = ({ 
  userName, 
  todos, 
  isLoading, 
  refreshing, 
  theme, 
  isDarkMode,
  onRefresh, 
  onAddTask, 
  onEditTask, 
  onDeleteTask,
  onRefreshTodos
}: TaskListUIProps) => {
  
  // Render Todo item
  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={[
      styles.todoItem, 
      { backgroundColor: theme.todoItemBackground }
    ]}>
      <Text style={[styles.todoText, { color: theme.todoTextColor }]}>
        {item.description}
      </Text>
      
      <View style={styles.todoActions}>
        <TouchableOpacity onPress={() => onDeleteTask(item.id)}>
          <Ionicons name="trash" size={24} color={theme.iconColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEditTask(item)}>
          <Ionicons name="pencil" size={24} color={theme.iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: theme.textColor }]}>Hey, Welcome Back</Text>
          <Text style={[styles.subTitle, { color: theme.secondaryText }]}>{userName}</Text>
        </View>
        
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={onRefreshTodos}
            disabled={isLoading}
          >
            <Ionicons name="refresh" size={24} color={theme.iconColor} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.addTaskButton} 
            onPress={onAddTask}
          >
            <Ionicons name="add-circle" size={24} color={theme.iconColor} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>Todo List</Text>
      </View>
      
      {isLoading ? (
        <ActivityIndicator 
          size="large" 
          color={theme.buttonBackground} 
          style={styles.loadingIndicator} 
        />
      ) : (
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={[styles.emptyListText, { color: theme.alertText }]}>No tasks found</Text>
          }
          contentContainerStyle={styles.todoList}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={[theme.buttonBackground]}
              tintColor={isDarkMode ? '#fff' : theme.buttonBackground}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 8
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshButton: {
    padding: 10,
  },
  addTaskButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  todoList: {
    marginTop: 20,
    borderRadius: 20
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10
  },
  todoText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  todoActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 2
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskListScreen;