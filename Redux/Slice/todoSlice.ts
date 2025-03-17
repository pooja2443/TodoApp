import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '@/Types/todoType';

interface TodoState {
    todos : Todo[],
    isLoading : boolean,
    error : string | null
}

const initialState: TodoState = {
    todos : [],
    isLoading : false,
    error : null
}

export const todoSlice = createSlice({
    name : "todo",
    initialState,
    reducers : {
        fetchTodoStart : (state) => {
            state.isLoading = true,
            state.error = null
        },
        fetchTodoSuccess : (state, action : PayloadAction<Todo[]>) => {
            state.todos = action.payload,
            state.isLoading = false,
            state.error = null
        },
        fetchTodoFail : (state, action: PayloadAction<string>) => {
            state.isLoading = false,
            state.error = action.payload
        },
        addTodoStart : (state) => {
            state.isLoading = true,
            state.error = null
        },
        addTodoSuccess : (state, action : PayloadAction<Todo>) => {
            state.todos.push(action.payload),
            state.isLoading = false,
            state.error = null
        },
        addTodoFail : (state, action: PayloadAction<string>) => {
            state.isLoading = false,
            state.error = action.payload
        },
        removeTodoStart : (state) => {
            state.isLoading = true,
            state.error = null
        },
        removeTodoSuccess : (state, action : PayloadAction<Todo>) => {
            state.todos.filter( todo => todo.id !== action.payload.id)
            state.isLoading = false,
            state.error = null
        },
        removeTodoFail : (state, action: PayloadAction<string>) => {
            state.isLoading = false,
            state.error = action.payload
        },
        updateTodoStart : (state) => {
            state.isLoading = true,
            state.error = null
        },
        updateTodoSuccess : (state, action : PayloadAction<Todo>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id)
            if(index !== -1){
                state.todos[index] = action.payload
            }
            state.isLoading = false,
            state.error = null
        },
        updateTodoFail : (state, action: PayloadAction<string>) => {
            state.isLoading = false,
            state.error = action.payload
        },
    }
})

export const { fetchTodoStart,fetchTodoSuccess,fetchTodoFail,
               addTodoStart,addTodoSuccess,addTodoFail,
               removeTodoStart,removeTodoSuccess,removeTodoFail,
               updateTodoStart,updateTodoSuccess,updateTodoFail} = todoSlice.actions;

export default todoSlice.reducer;