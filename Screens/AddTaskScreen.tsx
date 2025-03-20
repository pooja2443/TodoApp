import React from 'react';
import { View,Text,TextInput,TouchableOpacity,SafeAreaView,StatusBar,KeyboardAvoidingView,ActivityIndicator,StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type AddTaskUIProps = {
  description: string;
  isLoading: boolean;
  isEditing: boolean;
  theme: any;
  onChangeDescription: (text: string) => void;
  onSave: () => void;
  onGoBack: () => void;
};

const AddTaskScreen = ({description,isLoading,isEditing,theme,onChangeDescription,onSave,onGoBack}: AddTaskUIProps) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar barStyle={theme.textColor === '#fff' ? "light-content" : "dark-content"} />
      
      <View style={[styles.header, { backgroundColor: theme.headerBackground }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onGoBack}
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

      <KeyboardAvoidingView style={styles.content}>
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
          onChangeText={onChangeDescription}
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
          onPress={onSave}
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
};

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
    width: 40, 
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

export default AddTaskScreen;