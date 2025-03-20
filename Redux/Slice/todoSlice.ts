import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '@/Types/todoType';
import { fetchTodos, addTodos, updateTodos, removeTodos } from '@/Redux/Thunks/todoThunk';

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: null
};

const handlePending = (state: TodoState) => {
  state.isLoading = true;
  state.error = null;
}

const handleRejected = (state: TodoState, action: PayloadAction<unknown>) => {
  state.isLoading = false;
  state.error = action.payload as string;
}

export const todoSlice = createSlice({
  name : "todo",
  initialState,
  reducers : {
    clearErrors : (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    //fetchTodos
    builder
      .addCase(fetchTodos.pending, handlePending)
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.error = null;
        state.isLoading = false
      })
      .addCase(fetchTodos.rejected, handleRejected)
    //addTodo
    builder
      .addCase(addTodos.pending, handlePending)
      .addCase(addTodos.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addTodos.rejected, handleRejected)
    //updateTodo
    builder
      .addCase(updateTodos.pending, handlePending)
      .addCase(updateTodos.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateTodos.rejected, handleRejected);
    //deleteTodo
    builder
      .addCase(removeTodos.pending, handlePending)
      .addCase(removeTodos.fulfilled, (state, action: PayloadAction<string | number>) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(removeTodos.rejected, handleRejected);
  }
})

export const { clearErrors } = todoSlice.actions;
export default todoSlice.reducer;