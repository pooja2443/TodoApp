import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { api } from "@/Services/api";

//fetch todos thunk
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try{
            const response = await api.fetchTodos();
            return response;
        }catch (error){
            return rejectWithValue(error instanceof Error ? error.message :'Failed to fetch todos');
        }   
    }
)
//add todo thunk
export const addTodos = createAsyncThunk(
    'todos/addTodos',
    async (description : string, { rejectWithValue }) => {
        try{
            const response = await api.addTodo(description);
            return response
        }catch (error){
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to add todo');
        }
    }
)
//delete todo thunk
export const removeTodos = createAsyncThunk(
    'todos/removeTodos',
    async (id : number, { rejectWithValue }) => {
        try{
            await api.deleteTodo(id);
            return id;
        }catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete todo')
        }
    }
)
//update todo thunk
export const updateTodos = createAsyncThunk(
    'tdods/updateTodos',
    async ({ id, description }: {id: number; description:string}, { rejectWithValue} ) => {
        try{
            const response = await api.updateTodo(id,description);
            return response;
        }catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update todo')
        }
    }
)